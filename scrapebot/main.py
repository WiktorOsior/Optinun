# CREATE TABLE articles (link TEXT PRIMARY KEY, title TEXT, description TEXT, embedding vector(1024), img TEXT, agency TEXT, pubDate VARCHAR(255));
from email.utils import parsedate_to_datetime

import requests
from bs4 import BeautifulSoup
import psycopg2
from psycopg2 import OperationalError, Error
from psycopg2.extensions import JSON
from sentence_transformers import SentenceTransformer
import xml.etree.ElementTree as ET
import time
import schedule
import logging
from sklearn.cluster import DBSCAN
from psycopg2.extras import execute_values
import json
import numpy as np
import os
from pathlib import Path
from dotenv import load_dotenv

current_dir = Path(__file__).resolve().parent
env_path = current_dir.parent / '.env'

load_dotenv(env_path)

db_password = os.getenv("POSTGRES_PASSWORD")
db_user = os.getenv("POSTGRES_USER")
db_name = os.getenv("POSTGRES_DB")

LOG_FILE = "scraper.log"
open(LOG_FILE, "w").close()
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    filename = LOG_FILE
)

def clustering():
    try:
        conn = psycopg2.connect(
            user=db_user,
            database=db_name,
            password=db_password,
            host=os.getenv("DB_HOST", "localhost"), # Pobierz z env lub użyj localhost (dla testów na Macu)
            port="5432"
        )
        with conn.cursor() as cur:
            cur.execute("SELECT link, embedding FROM articles")
            rows = cur.fetchall()

            vectors = []
            links = []
            for r in rows:
                links.append(r[0])
                vectors.append(np.array(json.loads(r[1]), dtype=np.float32))

            clustering = DBSCAN(eps=0.15, min_samples=1, metric='cosine').fit(vectors)
            lables = clustering.labels_
            updated_data = list(zip(lables.tolist(),links))

            sql = """
                UPDATE articles AS a 
                SET cluster_id = v.cluster_id 
                FROM (VALUES %s) AS v(cluster_id, link) 
                WHERE a.link = v.link
            """

            execute_values(cur,sql,updated_data)
            conn.commit()
        conn.close()
        logging.info("Succesfull DBSAN clustering")
    except Exception as e:
        logging.error(f"DBSCAN ERROR: {e}")

def clean_repeats():
    try:
        conn = psycopg2.connect(
            user=db_user,
            database=db_name,
            password=db_password,
            host=os.getenv("DB_HOST", "localhost"), # Pobierz z env lub użyj localhost (dla testów na Macu)
            port="5432"
        )
        with conn.cursor() as cur:
            cur.execute("SELECT link FROM articles WHERE agency = 'TVN' ORDER BY pubdate")
            links = cur.fetchall()
            tvn = set()
            to_delete = list()
            for tup in links:
                l = tup[0]
                if "st" not in l:
                    continue
                end = l.rsplit("st",1)[1]
                if end in tvn:
                    to_delete.append(l)
                else:
                    tvn.add(end)
            if to_delete:
                cur.execute("DELETE FROM articles WHERE link = ANY(%s)",(to_delete,))
            conn.commit()
        conn.close()
        logging.info("Succesfull cleaning duplicates")
    except Exception as e:
        logging.error(f"Cleaning duplicates Error: {e}")

def clean_old_articles():
    try:
        conn = psycopg2.connect(
            user=db_user,
            database=db_name,
            password=db_password,
            host=os.getenv("DB_HOST", "localhost"), # Pobierz z env lub użyj localhost (dla testów na Macu)
            port="5432"
        )
        with conn.cursor() as cur:
            cur.execute("DELETE FROM articles WHERE pubdate < NOW() - INTERVAL '14 days';")
            deleted = cur.rowcount
            conn.commit()
            if deleted > 0:
                logging.info(f"CLEANUP: Usunięto {deleted} przeterminowanych artykułów.")
            else:
                logging.info("CLEANUP: Brak artykułów do usunięcia.")
        conn.close()
    except Exception as e:
        logging.error(f"CLEANUP ERROR: {e}")

def clean_date(date_str):
    if not date_str:
        return None
    try:
        dt_obj = parsedate_to_datetime(date_str)
        return dt_obj
    except Exception as e:
        logging.error(f"Nie udało się sparsować daty '{date_str}': {e}")
        return None

def fetch_single(url,agency,parse_func):
    try:
        response = requests.get(url)
        response.raise_for_status()
        root = ET.fromstring(response.content)
        return parse_func(root,agency)
    except requests.RequestException as e:
        logging.error(f"Error when fetching from {agency} : {e}")
    except ET.ParseError() as e:
        logging.error(f"Error when parrsing XML from {agency} : {e}")
    return[]

def parse_tvn(root,agency):
    articles = []
    for item in root.findall('./channel/item'):
        info = {'agency': agency}
        for child in item:
            try:
                if child.tag == 'description':
                    text = child.text.split("\"")
                    info['img']=text[1] if len(text) > 1 else None
                    text = child.text.split(">")
                    info['description']=text[1].strip() if len(text) > 1 else None
                elif child.tag == 'ling':
                    continue
                elif child.tag == 'guid':
                    info['link'] = child.text
                elif child.tag == 'pubDate':
                    info['pubDate'] = clean_date(child.text)
                else:
                    info[child.tag] = child.text
            except Exception as e:
                logging.error(f"Error when proccessing {child.tag} for {agency} : {e}")
        articles.append(info)
    return articles

def parse_standard(root,agency):
    articles = []
    for item in root.findall('./channel/item'):
        info = {'agency': agency}
        for child in item:
            if child.tag == 'enclosure' and 'img' not in info.keys():
                info['img'] = child.attrib['url']
            elif child.tag in ['guid','enclosure','category']:
                continue
            elif child.tag == 'pubDate':
                info['pubDate'] = clean_date(child.text)
            else:
                info[child.tag] = child.text
        articles.append(info)
    return articles


def get_model_path():
    env_model = os.getenv('MODEL_PATH')
    if env_model and os.path.exists(env_model):
        return env_model

    local_base_dir = Path(__file__).resolve().parent.parent
    local_model_path = local_base_dir / "mmlw-retrieval-roberta-large-v2"

    if local_model_path.exists():
        return str(local_model_path)





def main():
    final_path = get_model_path()
    logging.info("Staring scraping cycle")
    all_articles = []
    agencies = [
        ('https://www.tvn24.pl/najnowsze.xml','TVN',parse_tvn),
        ('https://www.polsatnews.pl/rss/wszystkie.xml', 'POLSAT', parse_standard),
        ('http://nt.interia.pl/feed', 'INTERIA', parse_standard),
        ('https://wpolsce24.tv/rss/najnowsze.xml', 'WPOLSCE24', parse_standard),
        ('https://wiadomosci.onet.pl/.feed', 'ONET', parse_standard),
    ]
    try:
        model = SentenceTransformer(final_path)
    except Exception as e:
        logging.error(f"Error when starting model : {e}")

    for url, agency, parser in agencies:
        try:
            fetched = fetch_single(url, agency, parser)
            if fetched:
                all_articles.extend(fetched)
                logging.info(f"Pobrano {len(fetched)} artykułów z {agency}")
        except Exception as e:
            logging.error(f"Nie udało się pobrać z {agency}: {e}")


    try:
        conn = psycopg2.connect(
            user=db_user,
            database=db_name,
            password=db_password,
            host=os.getenv("DB_HOST", "localhost"),
            port="5432"
        )

        with conn.cursor() as cur:
            for article in all_articles:
                try:
                    desc = article.get('description') or ""
                    embedding = model.encode(desc, show_progress_bar=False).tolist() if desc else [0.0] * 1024
                    cur.execute("""
                    INSERT INTO articles (link, title, description, embedding, img, agency, pubDate)
                    VALUES(%s,%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (link)
                    DO UPDATE SET
                        title = EXCLUDED.title,
                        embedding = EXCLUDED.embedding,
                        img = EXCLUDED.img,
                        description = EXCLUDED.description,
                        agency = EXCLUDED.agency,
                        pubDate = EXCLUDED.pubDate;
                    """,(
                        article['link'],
                        article['title'],
                        desc,
                        str(embedding),
                        article['img'],
                        article['agency'],
                        article['pubDate']
                    ))
                except Exception as e:
                    logging.error(f"Error when inserting {article} into database : {e}")
        conn.commit()
        conn.close()
        logging.info("Database update successful")
    except OperationalError as e:
        logging.error(f"Error when connecting to database : {e}")
    clean_repeats()
    clustering()


main()
clean_old_articles()

schedule.every().day.at("03:00").do(clean_old_articles)
schedule.every(60).minutes.do(main)


if __name__ == "__main__":
    logging.info("Starting script")
    while True:
        try:
            schedule.run_pending()
            time.sleep(60)
        except KeyboardInterrupt:
            logging.info("Scheduler stopped manually.")
            break
        except Exception as e:
            logging.error(f"Error in main loop: {e}")




import psycopg2
from fastapi import FastAPI, HTTPException
from psycopg2 import OperationalError
from psycopg2.extras import RealDictCursor
from sentence_transformers import SentenceTransformer
import logging
import os
from pathlib import Path
from dotenv import load_dotenv

current_dir = Path(__file__).resolve().parent
env_path = current_dir.parent / '.env'

load_dotenv(env_path)

db_password = os.getenv("POSTGRES_PASSWORD")
db_user = os.getenv("POSTGRES_USER")
db_name = os.getenv("POSTGRES_DB")
app = FastAPI()

LOG_FILE = "fastapi.log"
open(LOG_FILE, "w").close()
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    filename = LOG_FILE
)

def get_model_path():
    env_model = os.getenv('MODEL_PATH')
    if env_model and os.path.exists(env_model):
        return env_model

    local_base_dir = Path(__file__).resolve().parent.parent
    local_model_path = local_base_dir / "mmlw-retrieval-roberta-large-v2"

    if local_model_path.exists():
        return str(local_model_path)

final_path = get_model_path()

model = SentenceTransformer(final_path)
@app.get("/similaritysearch/")
async def similarity(input: str):
    if not input:
        raise HTTPException(status_code=400, detail="Brak frazy do wyszukania")
    try:
        conn = psycopg2.connect(
            user=db_user,
            database=db_name,
            password=db_password,
            host=os.getenv("DB_HOST", "localhost"),
            port = "5432"
        )

        query = f"[query]: {input}"
        query.replace("%20"," ")
        print(query)
        embedding = model.encode(query, show_progress_bar=False).tolist()

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            try:
                cur.execute("""
                SELECT link, title, description, img, agency, pubDate, cluster_id FROM articles 
                WHERE 1 - (embedding <=> %s::vector ) > 0.6 
                ORDER BY 1 - (embedding <=> %s::vector) DESC 
                """,(
                    embedding,
                    embedding
                ))

                results = cur.fetchall()
            except Exception as e:
                logging.error(f"Error : {e}")
        conn.close()
        logging.info("Database querry succesfull")
        return results
    except OperationalError as e:
        logging.error(f"Error when connecting to database : {e}")
        raise HTTPException(status_code=500, detail=str(e))
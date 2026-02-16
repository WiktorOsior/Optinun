CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS articles (
    link TEXT PRIMARY KEY,           -- Unikalny identyfikator (URL)
    title TEXT,
    description TEXT,
    embedding vector(1024),          -- Wektor dla modelu Large (sprawdź czy Twój model ma 1024 czy 768!)
    img TEXT,                        -- TEXT zamiast VARCHAR (żeby nie było błędu 255 znaków)
    agency TEXT,
    pubDate TIMESTAMP,               -- Data publikacji
    cluster_id INTEGER               -- Do grupowania (DBSCAN)
);

-- 3. Sprawdź czy tabela powstała
\d articles
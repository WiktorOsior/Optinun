FROM python:3.11
LABEL authors="wiktorosior"


WORKDIR /app

# Instalujemy zależności systemowe (wymagane przez psycopg2)
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

# Instalujemy biblioteki Pythona
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiujemy kod
COPY . .

# Uruchamiamy FastAPI
CMD ["fastapi", "run", "main.py", "--port", "8000", "--host", "0.0.0.0"]
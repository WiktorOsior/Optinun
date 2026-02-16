FROM python:3.11
LABEL authors="wiktorosior"

WORKDIR /app

# Instalujemy zależności systemowe (wymagane dla psycopg2 i numpy)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Kopiujemy requirements i instalujemy
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiujemy kod scrapera
COPY . .

# Uruchamiamy skrypt.
# -u (unbuffered) jest ważne, żebyś widział logi w 'docker logs' na bieżąco
CMD ["python", "-u", "main.py"]
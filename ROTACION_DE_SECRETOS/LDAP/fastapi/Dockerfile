FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Instead of doing COPY app ./app, we have to copy everything within the current folder
COPY . .

CMD ["uvicorn", "run:app", "--host", "0.0.0.0", "--port", "8000"]

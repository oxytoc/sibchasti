FROM python:3.9-slim

# Установка рабочей директории
WORKDIR /app

# Копирование файлов
COPY . .

# Установка Python-зависимостей
RUN pip install --no-cache-dir pandas scikit-learn nltk joblib flask psycopg2-binary gunicorn numpy

# Делаем скрипт доступным для выполнения
RUN chmod +x ./wait-for-it.sh
RUN chmod +x ./entrypoint.sh

# Запуск Flask сервера
CMD ["./entrypoint.sh"]

#!/bin/bash

# Ждем доступности базы данных
./wait-for-it.sh app:3000 --timeout=30 -- echo "App is up"
./wait-for-it.sh db:5432 --timeout=30 -- echo "Database is up"

# Запускаем обучение модели
python3 personal.py
python3 forecasting.py


# После обучения запускаем Flask сервер
exec gunicorn -b 0.0.0.0:5000 app:app

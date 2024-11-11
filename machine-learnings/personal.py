# training.py
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import joblib
import nltk
from nltk.corpus import stopwords
import psycopg2

# Настройки подключения к базе данных
db_config = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': '5432'
}

# Загрузка стоп-слов для русского языка
nltk.download('stopwords')
russian_stop_words = stopwords.words('russian')

def load_data_from_db():
    connection = psycopg2.connect(**db_config)
    query = "SELECT id, brand, description, name, quantity, article, vin, type, price FROM part;"
    df = pd.read_sql_query(query, connection)
    connection.close()
    return df

def train_model():
    # Загружаем данные
    df = load_data_from_db()

    # Векторизация описаний товаров
    tfidf = TfidfVectorizer(stop_words=russian_stop_words)
    tfidf_matrix = tfidf.fit_transform(df['description'])

    # Расчет косинусного сходства между товарами
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Сохранение обученной модели и данных
    joblib.dump(tfidf, 'model/tfidf_vectorizer.pkl')
    joblib.dump(cosine_sim, 'model/cosine_sim_matrix.pkl')
    joblib.dump(df, 'model/item_data.pkl')

train_model()
print("Модель успешно обучена и сохранена.")

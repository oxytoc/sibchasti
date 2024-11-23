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

# Загрузка данных о товарах и покупках пользователей
def load_data_from_db():
    connection = psycopg2.connect(**db_config)
    part_query = "SELECT id, brand, description, name, quantity, article, vin, type, price FROM part;"
    purchase_query = """
        SELECT u.id AS user_id, p.id AS part_id
        FROM "order" o
        JOIN "order_part_quantities_part_quantity" opq ON o.id = opq."orderId"
        JOIN "part_quantity" pq ON opq."partQuantityId" = pq.id
        JOIN "part" p ON pq."partId" = p.id
        JOIN "user" u ON o."user_id" = u.id
        WHERE o."orderStatus" = 'closed';
    """
    part_df = pd.read_sql_query(part_query, connection)
    purchase_df = pd.read_sql_query(purchase_query, connection)
    connection.close()
    return part_df, purchase_df

def train_model():
    # Загружаем данные
    part_df, purchase_df = load_data_from_db()

    # Векторизация описаний товаров
    tfidf = TfidfVectorizer(stop_words=russian_stop_words)
    tfidf_matrix = tfidf.fit_transform(part_df['description'])

    # Расчет косинусного сходства между товарами
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    # Сохранение обученной модели и данных
    joblib.dump(tfidf, 'model/tfidf_vectorizer.pkl')
    joblib.dump(cosine_sim, 'model/cosine_sim_matrix.pkl')
    joblib.dump(part_df, 'model/item_data.pkl')
    joblib.dump(purchase_df, 'model/purchase_data.pkl')

train_model()
print("Модель успешно обучена и сохранена.")

# Функция для генерации персонализированных рекомендаций
def generate_recommendations(user_id):
    # Загружаем модели и данные
    tfidf = joblib.load('model/tfidf_vectorizer.pkl')
    cosine_sim = joblib.load('model/cosine_sim_matrix.pkl')
    part_df = joblib.load('model/item_data.pkl')
    purchase_df = joblib.load('model/purchase_data.pkl')

    # Получаем список товаров, купленных пользователем
    user_purchases = purchase_df[purchase_df['user_id'] == user_id]['part_id'].tolist()

    if not user_purchases:
        return []  # Если пользователь ничего не покупал, возвращаем пустой список

    # Находим индексы купленных товаров
    purchased_indices = [part_df[part_df['id'] == part_id].index[0] for part_id in user_purchases]

    # Рассчитываем среднее косинусное сходство для всех купленных товаров
    sim_scores = cosine_sim[purchased_indices].mean(axis=0)

    # Сортируем товары по средней схожести
    sim_scores = list(enumerate(sim_scores))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Исключаем товары, которые пользователь уже купил
    recommended_indices = [idx for idx, score in sim_scores if idx not in purchased_indices]

    # Возвращаем топ-N рекомендаций
    recommended_items = part_df.iloc[recommended_indices]
    return recommended_items[['id', 'name', 'description']].to_dict('records')

import os
import pandas as pd
import psycopg2
from sklearn.linear_model import LinearRegression
import numpy as np
import joblib
from datetime import datetime

db_config = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': '5432'
}

# Подключение к базе данных PostgreSQL, ВОЗРАЩАЕТ ПУСТОТУ
def load_order_data():
    connection = psycopg2.connect(**db_config)
    query = """
        SELECT 
            p.id AS part_id,
            p.name AS part_name,
            pq.quantity AS quantity,
            o."orderDate" AS order_date
        FROM "order" o
        JOIN "order_part_quantities_part_quantity" opq ON o.id = opq."orderId"
        JOIN "part_quantity" pq ON opq."partQuantityId" = pq.id
        JOIN "part" p ON pq."partId" = p.id
        WHERE o."orderStatus" = 'closed';
    """
    df = pd.read_sql(query, connection)
    connection.close()
    return df

# Подготовка данных для прогнозирования
def preprocess_data(df):
    df['order_date'] = pd.to_datetime(df['order_date'])
    df = df.groupby(['part_id', 'part_name', pd.Grouper(key='order_date', freq='ME')])['quantity'].sum().reset_index()
    time_series_data = {}
    for part_id in df['part_id'].unique():
        part_df = df[df['part_id'] == part_id].copy()
        part_df = part_df.set_index('order_date').resample('M').sum().fillna(0)
        time_series_data[part_id] = part_df['quantity'].values
    return time_series_data

# Обучение моделей
def train_models(time_series_data):
    model_dict = {}
    for part_id, data in time_series_data.items():
        X = np.arange(len(data)).reshape(-1, 1)
        y = data
        model = LinearRegression()
        model.fit(X, y)
        model_dict[part_id] = model
    joblib.dump(model_dict, 'model/demand_models.joblib')
    print("Модели обучены и сохранены.")
    
# Прогнозирование на основе сохраненной модели
def load_models():
    return joblib.load('model/demand_models.joblib')

def forecast_demand(time_series_data, period):
    model_dict = load_models()
    predictions = {}
    print(model_dict, time_series_data.items(), flush=True)
    for part_id, data in time_series_data.items():
        model = model_dict.get(part_id)
        if model:
            future_X = np.arange(len(data), len(data) + period).reshape(-1, 1)
            predicted_demand = model.predict(future_X)
            predictions[part_id] = predicted_demand
    return predictions

# Функция для обучения моделей
def train_forecast():
    df = load_order_data()
    if (len(df) == 0):
        return
    time_series_data = preprocess_data(df)
    train_models(time_series_data)

# Функция для прогнозирования
def predict_forecast(period):
    df = load_order_data()
    time_series_data = preprocess_data(df)
    predictions = forecast_demand(time_series_data, period)
    print(predictions)
    return predictions

if __name__ == "__main__":
    # Выберите нужную функцию для запуска: обучение или прогнозирование
    train_forecast()  # Обучение моделей

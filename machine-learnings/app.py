# personal-offers.py

from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from personal import train_model
from forecasting import train_forecast, predict_forecast

app = Flask(__name__)

# Загрузка модели и данных
tfidf = joblib.load('/app/model/tfidf_vectorizer.pkl')
cosine_sim = joblib.load('/app/model/cosine_sim_matrix.pkl')
df = joblib.load('/app/model/item_data.pkl')

def get_recommendations(item_names):
    for item_name in item_names:
        if item_name.strip() not in [str(name).strip() for name in df['name'].values]:
            return []
    
    # Находим индексы товаров по их именам
    indices = [df.index[df['name'] == item].tolist()[0] for item in item_names]

        # Рассчитываем среднюю схожесть по всем выбранным товарам
    sim_scores = np.mean([cosine_sim[idx] for idx in indices], axis=0)
    
    # Сортируем товары по средней схожести
    sim_scores = list(enumerate(sim_scores))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Исключаем исходные товары из рекомендаций
    sim_scores = [score for score in sim_scores if score[0] not in indices]
    
    recommended_items = df.iloc[[i[0] for i in sim_scores]].to_dict(orient='records')
    return recommended_items

@app.route('/recommend-offers', methods=['POST'])
def recommend():
    data = request.json
    item_names = data.get('item_names')
    if not item_names:
        return jsonify({'error': 'item_names is required'}), 400
    recommendations = get_recommendations(item_names)
    return jsonify({'recommendations': recommendations})

# эндпоинт для переобучения модели
@app.route('/retrain', methods=['POST'])
def retrain():
    try:
        # Запускаем процесс обучения
        train_model()
        
        # Сообщаем об успешном обновлении модели
        return jsonify({"message": "Model retrained successfully"}), 200
    except Exception as e:
        # Если возникла ошибка, возвращаем её
        return jsonify({"error": str(e)}), 500

@app.route('/forecaste', methods=['POST'])
def forecast():
    print(request.json.get('period'), flush=True)
    data = request.json
    period = data.get('period')
    if not period:
        return jsonify({'error': 'period is required'}), 400
    forecast = predict_forecast(period)
    forecast_cleaned = {int(k): [float(v) for v in val] for k, val in forecast.items()}
    print(forecast_cleaned)
    return forecast_cleaned

@app.route('/retrain-forecast', methods=['POST'])
def retrain_forecast():
    try:
        # Запускаем процесс обучения
        train_forecast()
        
        # Сообщаем об успешном обновлении модели
        return jsonify({"message": "Model retrained successfully"}), 200
    except Exception as e:
        # Если возникла ошибка, возвращаем её
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

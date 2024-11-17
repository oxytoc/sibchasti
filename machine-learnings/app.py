# personal-offers.py

from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from personal import generate_recommendations, train_model
from forecasting import train_forecast, predict_forecast

app = Flask(__name__)

@app.route('/recommend-offers', methods=['POST'])
def recommend():
    data = request.json
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    recommendations = generate_recommendations(user_id)
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

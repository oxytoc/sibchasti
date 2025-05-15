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
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body is required'}), 400
            
        period_days = data.get('period')
        if not period_days or not isinstance(period_days, int):
            return jsonify({'error': 'Valid period (integer) is required'}), 400

        # Получаем прогноз в новом формате
        predictions = predict_forecast(period_days)
        
        # Преобразуем данные для фронтенда
        result = []
        for part_id, part_data in predictions.items():
            # Формируем запись для каждой детали
            part_entry = {
                'partId': part_id,
                'partName': part_data.get('part_name', 'Unknown Part'),
                'forecasts': []
            }
            
            # Добавляем прогнозы по дням
            for forecast in part_data['forecasts']:
                part_entry['forecasts'].append({
                    'date': forecast['date'],
                    'predictedQuantity': float(forecast['predicted_quantity'])
                })
            
            result.append(part_entry)

        return jsonify(result)

    except Exception as e:
        print(f"Error in forecast: {str(e)}", flush=True)
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

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

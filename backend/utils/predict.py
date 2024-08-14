import pandas as pd
import json
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import sys

def main(data):
    expanded_data = []
    for order in data:
        for part_quantity in order["partQuantities"]:
            expanded_data.append({
                "orderDate": order["orderDate"],
                "client_id": order["client"]["id"],
                "part_id": part_quantity["part"]["id"],
                "quantity": part_quantity["quantity"],
                "part_brand": part_quantity["part"]["brand"],
                "part_name": part_quantity["part"]["name"],
                "part_code": part_quantity["part"]["partCode"],
                "part_type": part_quantity["part"]["type"],
                "part_price": part_quantity["part"]["price"]
            })

    expanded_df = pd.DataFrame(expanded_data)

    # Преобразуем orderDate в числовой формат (секунды с начала эпохи)
    expanded_df['orderDate'] = pd.to_datetime(expanded_df['orderDate']).apply(lambda x: x.timestamp()).astype(int)

    # Создание признаков и целевой переменной
    X = expanded_df[['orderDate', 'client_id']]
    y = expanded_df[['part_id', 'quantity', 'part_brand', 'part_name', 'part_code', 'part_type', 'part_price']]

    # Преобразуем категориальные признаки в числовые
    le_part_brand = LabelEncoder()
    le_part_name = LabelEncoder()
    le_part_type = LabelEncoder()

    y['part_brand'] = le_part_brand.fit_transform(y['part_brand'])
    y['part_name'] = le_part_name.fit_transform(y['part_name'])
    y['part_type'] = le_part_type.fit_transform(y['part_type'])

    # Разделим данные на обучающую и тестовую выборки
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Обучим модель
    model = RandomForestClassifier()
    multi_target_model = MultiOutputClassifier(model, n_jobs=-1)
    multi_target_model.fit(X_train, y_train)

    # Прогнозирование для следующих n клиентов
    n = 5
    new_clients = pd.DataFrame({
        'orderDate': [pd.Timestamp.now().timestamp()] * n,
        'client_id': range(max(expanded_df['client_id']) + 1, max(expanded_df['client_id']) + 1 + n)
    })

    new_clients['orderDate'] = new_clients['orderDate'].astype(int)

    predictions = multi_target_model.predict(new_clients)

    predicted_parts = pd.DataFrame(predictions, columns=y.columns)

    # Обратное преобразование категориальных признаков
    predicted_parts['part_brand'] = le_part_brand.inverse_transform(predicted_parts['part_brand'])
    predicted_parts['part_name'] = le_part_name.inverse_transform(predicted_parts['part_name'])
    predicted_parts['part_type'] = le_part_type.inverse_transform(predicted_parts['part_type'])

    print(predicted_parts.to_json(orient='records'))

if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    main(input_data)

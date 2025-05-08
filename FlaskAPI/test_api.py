import requests
import json

# Test avec un user_id existant dans user_metrics
test_data = {"user_id": 26}  # Remplacez par un ID réel

response = requests.post(
    'http://localhost:5000/predict',
    headers={'Content-Type': 'application/json'},
    data=json.dumps(test_data)
)

print("Status Code:", response.status_code)
print("Response:", response.json())
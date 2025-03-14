from flask import Flask, request, jsonify
import joblib
import numpy as np
from weather_api import get_weather_data  # Import the weather API function
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to avoid cross-origin issues

# Load the trained rainfall prediction model
model = joblib.load("rainfall_model.pkl")

# Define LabelEncoder for city encoding
le = LabelEncoder()
le.fit(["pune"])  # Since our dataset only has Pune, we map all requests to Pune

@app.route('/')
def home():
    return "✅ Rainfall Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get city name from request JSON
        data = request.get_json()
        city = data.get("city", None)  # Extract city from input

        if not city:
            return jsonify({"error": "City name is required"}), 400

        # Fetch real-time weather data
        weather_data = get_weather_data(city)

        if "error" in weather_data:
            return jsonify({"error": weather_data["error"]}), 500

        # Encode city as location_encoded (since we trained only on Pune)
        location_encoded = le.transform(["pune"])[0]  # Hardcoded to Pune

        # Extract required weather features (Matching Model Training)
        features = np.array([[  
            weather_data["temperature"] + 5,  # maxtempC (approx)
            weather_data["temperature"] - 5,  # mintempC (approx)
            0,  # totalSnow_cm (assumed 0)
            8,  # sunHour (default, not provided by API)
            5,  # uvIndex (default)
            weather_data["temperature"] - 10,  # DewPointC (approx)
            weather_data["temperature"],  # FeelsLikeC
            weather_data["temperature"] + 2,  # HeatIndexC (approx)
            weather_data["temperature"] - 3,  # WindChillC (approx)
            weather_data["wind_speed"] * 3.6,  # WindGustKmph (converted from m/s)
            weather_data["cloud_cover"],  # cloudcover
            weather_data["humidity"],  # humidity
            weather_data["pressure"],  # pressure
            weather_data["temperature"],  # tempC (duplicate for feature match)
            10,  # visibility (default)
            120,  # winddirDegree (default)
            weather_data["wind_speed"] * 3.6,  # windspeedKmph
            2025,  # year (default)
            2,  # month (default)
            23,  # day (default)
            14,  # hour (default)
            1,  # season (default)
            location_encoded  # Added location_encoded to match model input!
        ]])

        # Make rainfall prediction
        prediction = model.predict(features)[0]

        # Ensure rainfall prediction is non-negative
        prediction = max(0, prediction)

        # Return response
        return jsonify({
            "city": city,
            "predicted_rainfall_mm": round(float(prediction), 3),
            "weather_data": weather_data
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

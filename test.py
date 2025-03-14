import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor

# Load dataset
file_path = "rainfall_dataset.csv"  # Update path if needed
df = pd.read_csv(file_path)

# Convert date_time to datetime format
df["date_time"] = pd.to_datetime(df["date_time"], format="%d-%m-%Y %H:%M")

# Drop irrelevant columns
columns_to_drop = ["moonrise", "moonset", "sunrise", "sunset", "moon_illumination", "date_time", "location"]
df_cleaned = df.drop(columns=columns_to_drop)

# Extract time-based features
df_cleaned["year"] = df["date_time"].dt.year
df_cleaned["month"] = df["date_time"].dt.month
df_cleaned["day"] = df["date_time"].dt.day
df_cleaned["hour"] = df["date_time"].dt.hour
df_cleaned["season"] = df["month"] % 12 // 3 + 1  # 1: Winter, 2: Spring, 3: Summer, 4: Fall

# Define features (X) and target variable (y)
X = df_cleaned.drop(columns=["precipMM"])  # Features
y = df_cleaned["precipMM"]  # Target (Rainfall in mm)

# Split dataset into training (80%) and testing (20%)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize XGBoost Regressor
xgb_model = XGBRegressor(n_estimators=300, learning_rate=0.05, max_depth=7, random_state=42)

# Train the model
xgb_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred_xgb = xgb_model.predict(X_test)

# Evaluate XGBoost model
mae_xgb = mean_absolute_error(y_test, y_pred_xgb)
mse_xgb = mean_squared_error(y_test, y_pred_xgb)
rmse_xgb = mse_xgb ** 0.5
r2_xgb = r2_score(y_test, y_pred_xgb)

print(f"MAE: {mae_xgb}, RMSE: {rmse_xgb}, R² Score: {r2_xgb}")

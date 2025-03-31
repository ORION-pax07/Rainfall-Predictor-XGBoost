// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../styles/Predictor.css";

// const Result = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Get data from navigation state
//     const { city, prediction, weatherData } = location.state || {};

//     return (
//         <div className="result-container">
//             <h1 className="page-heading">Prediction Results</h1>

//             {city && prediction !== null && (
//                 <div className="prediction-results">
//                     <h2>🌍 City: {city}</h2>
//                     <h3>🌧️ Predicted Rainfall: {prediction} mm</h3>

//                     {weatherData && (
//                         <div className="weather-data">
//                             <h4 className="weather-heading">Weather Data:</h4>
//                             <p className="weather-text">🌡️ Temperature: {weatherData.temperature}°C</p>
//                             <p className="weather-text">💧 Humidity: {weatherData.humidity}%</p>
//                             <p className="weather-text">🌀 Pressure: {weatherData.pressure} hPa</p>
//                             <p className="weather-text">🌬️ Wind Speed: {weatherData.wind_speed} m/s</p>
//                             <p className="weather-text">☁️ Cloud Cover: {weatherData.cloud_cover}%</p>
//                         </div>
//                     )}
//                 </div>
//             )}

//             <button className="back-button" onClick={() => navigate("/")}>
//                 🔙 Back to Predictor
//             </button>
//         </div>
//     );
// };

// export default Result;



import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css"; // ✅ Now using a separate CSS for Result page

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get data from navigation state
    const { city, prediction, weatherData } = location.state || {};

    return (
        <div className="result-container">
            <h1 className="page-heading">Prediction Results</h1>

            {city && prediction !== null && (
                <div className="prediction-results">
                    <h2>🌍 City: {city}</h2>
                    <h3>🌧️ Predicted Rainfall: {prediction} mm</h3>

                    {weatherData && (
                        <div className="weather-data">
                            <h4 className="weather-heading">Weather Data:</h4>
                            <p className="weather-text">🌡️ Temperature: {weatherData.temperature}°C</p>
                            <p className="weather-text">💧 Humidity: {weatherData.humidity}%</p>
                            <p className="weather-text">🌀 Pressure: {weatherData.pressure} hPa</p>
                            <p className="weather-text">🌬️ Wind Speed: {weatherData.wind_speed} m/s</p>
                            <p className="weather-text">☁️ Cloud Cover: {weatherData.cloud_cover}%</p>
                        </div>
                    )}
                </div>
            )}

            {/* ✅ Fixed: Now redirects to /predictor instead of home */}
            <button className="back-button" onClick={() => navigate("/predictor")}>
                🔙 Back to Predictor
            </button>
        </div>
    );
};

export default Result;

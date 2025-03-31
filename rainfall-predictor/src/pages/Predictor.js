



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "../styles/Predictor.css";

// const citySuggestions = ["Mumbai", "Thane", "Kalyan", "Dadar", "Ambarnath","Pune"];

// const Predictor = () => {
//     const [city, setCity] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [mode, setMode] = useState("api"); // "api" or "manual"

//     // Manual input states
//     const [temperature, setTemperature] = useState("");
//     const [humidity, setHumidity] = useState("");
//     const [pressure, setPressure] = useState("");
//     const [windSpeed, setWindSpeed] = useState("");
//     const [cloudCover, setCloudCover] = useState("");

//     const navigate = useNavigate();

//     const handlePredict = async (e) => {
//         e.preventDefault();
//         setError(null);

//         if (mode === "api" && !city.trim()) {
//             setError("⚠️ Please enter a valid city name!");
//             return;
//         }

//         setLoading(true);

//         try {
//             let requestData;

//             if (mode === "api") {
//                 // Fetch data via API
//                 const response = await axios.post("http://127.0.0.1:5000/predict", { city });

//                 if (response.data.error) {
//                     setError("⚠️ Error: " + response.data.error);
//                     setLoading(false);
//                     return;
//                 }

//                 requestData = {
//                     city,
//                     prediction: response.data.predicted_rainfall_mm,
//                     weatherData: response.data.weather_data,
//                 };
//             } else {
//                 // Use manual inputs
//                 if (!temperature || !humidity || !pressure || !windSpeed || !cloudCover) {
//                     setError("⚠️ Please fill all fields for manual prediction!");
//                     setLoading(false);
//                     return;
//                 }

//                 requestData = {
//                     city: "Manual Input",
//                     prediction: Math.random().toFixed(2), // Simulating prediction for manual input
//                     weatherData: {
//                         temperature,
//                         humidity,
//                         pressure,
//                         wind_speed: windSpeed,
//                         cloud_cover: cloudCover,
//                     },
//                 };
//             }

//             navigate("/result", { state: requestData });
//         } catch (err) {
//             console.error("Error fetching prediction:", err);
//             setError("⚠️ Failed to get prediction. Please check the server connection.");
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="predictor-container">
//             {/* ✅ Navigation Bar */}
//             <div className="nav-bar">
//                 <Link to="/" className="nav-link">Home</Link>
//                 <Link to="/about" className="nav-link">About</Link>
//                 <Link to="/predictor" className="nav-link active">Predictor</Link>
//             </div>

//             <h1 className="page-heading">Rainfall Predictor</h1>

//             {/* Mode Selection */}
//             <div className="mode-toggle">
//                 <button
//                     className={mode === "api" ? "mode-button active" : "mode-button"}
//                     onClick={() => setMode("api")}
//                 >
//                     🌍 Use API Data
//                 </button>
//                 <button
//                     className={mode === "manual" ? "mode-button active" : "mode-button"}
//                     onClick={() => setMode("manual")}
//                 >
//                     ✍️ Enter Manually
//                 </button>
//             </div>

//             {/* 🌍 API Mode - City Input */}
//             {mode === "api" && (
//                 <div className="predictor-content">
//                     <form onSubmit={handlePredict} className="predict-form">
//                         <input
//                             type="text"
//                             value={city}
//                             onChange={(e) => setCity(e.target.value)}
//                             placeholder="Enter City Name (e.g., Mumbai)"
//                             className="city-input"
//                             list="city-list"
//                         />
//                         <datalist id="city-list">
//                             {citySuggestions.map((c, index) => (
//                                 <option key={index} value={c} />
//                             ))}
//                         </datalist>
//                         <br /><br />
//                         <button type="submit" disabled={loading} className="predict-button">
//                             {loading ? "🔄 Predicting..." : "Predict"}
//                         </button>
//                     </form>
//                 </div>
//             )}

//             {/* ✍️ Manual Input Mode */}
//             {mode === "manual" && (
//                 <div className="manual-inputs">
//                     {/* 🌍 City Selection Box */}
//                     <input
//                         type="text"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         placeholder="Enter City Name (e.g., Pune)"
//                         className="city-input"
//                         list="city-list"
//                     />
//                     <datalist id="city-list">
//                         {citySuggestions.map((c, index) => (
//                             <option key={index} value={c} />
//                         ))}
//                     </datalist>

//                     {/* 🌡️ Temperature Input */}
//                     <input
//                         type="number"
//                         placeholder="🌡️ Temperature (°C)"
//                         value={temperature}
//                         onChange={(e) => setTemperature(e.target.value)}
//                         className="manual-input-box"
//                     />

//                     {/* 💧 Humidity Input */}
//                     <input
//                         type="number"
//                         placeholder="💧 Humidity (%)"
//                         value={humidity}
//                         onChange={(e) => setHumidity(e.target.value)}
//                         className="manual-input-box"
//                     />

//                     {/* 🌀 Pressure Input */}
//                     <input
//                         type="number"
//                         placeholder="🌀 Pressure (hPa)"
//                         value={pressure}
//                         onChange={(e) => setPressure(e.target.value)}
//                         className="manual-input-box"
//                     />

//                     {/* 🌬️ Wind Speed Input */}
//                     <input
//                         type="number"
//                         placeholder="🌬️ Wind Speed (m/s)"
//                         value={windSpeed}
//                         onChange={(e) => setWindSpeed(e.target.value)}
//                         className="manual-input-box"
//                     />

//                     {/* ☁️ Cloud Cover Input */}
//                     <input
//                         type="number"
//                         placeholder="☁️ Cloud Cover (%)"
//                         value={cloudCover}
//                         onChange={(e) => setCloudCover(e.target.value)}
//                         className="manual-input-box"
//                     />

//                     <br /><br />
//                     <button type="submit" disabled={loading} className="predict-button">
//                         {loading ? "🔄 Predicting..." : "Predict"}
//                     </button>
//             </div>
//         )}


//             {error && <p className="error-message">{error}</p>}
//         </div>
//     );
// };

// export default Predictor;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Predictor.css";

const citySuggestions = ["Mumbai", "Thane", "Kalyan", "Dadar", "Ambarnath", "Pune"];

const Predictor = () => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState("api"); // "api" or "manual"

    // Manual input states
    const [temperature, setTemperature] = useState("");
    const [humidity, setHumidity] = useState("");
    const [pressure, setPressure] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [cloudCover, setCloudCover] = useState("");

    const navigate = useNavigate();

    const handlePredict = async (e) => {
        e.preventDefault();
        setError(null);

        if (mode === "api" && !city.trim()) {
            setError("⚠️ Please enter a valid city name!");
            return;
        }

        setLoading(true);

        try {
            let requestData;

            if (mode === "api") {
                const response = await axios.post("http://127.0.0.1:5000/predict", { city });

                if (response.data.error) {
                    setError("⚠️ Error: " + response.data.error);
                    setLoading(false);
                    return;
                }

                requestData = {
                    city,
                    prediction: response.data.predicted_rainfall_mm,
                    weatherData: response.data.weather_data,
                };
            } else {
                if (!city.trim() || !temperature || !humidity || !pressure || !windSpeed || !cloudCover) {
                    setError("⚠️ Please fill all fields for manual prediction!");
                    setLoading(false);
                    return;
                }

                requestData = {
                    city,
                    prediction: Math.random().toFixed(2), // Simulating prediction for manual input
                    weatherData: {
                        temperature,
                        humidity,
                        pressure,
                        wind_speed: windSpeed,
                        cloud_cover: cloudCover,
                    },
                };
            }

            navigate("/result", { state: requestData });
        } catch (err) {
            console.error("Error fetching prediction:", err);
            setError("⚠️ Failed to get prediction. Please check the server connection.");
        }

        setLoading(false);
    };

    return (
        <div className="predictor-container">
            {/* ✅ Navigation Bar */}
            <div className="nav-bar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/predictor" className="nav-link active">Predictor</Link>
            </div>

            <h1 className="page-heading">Rainfall Predictor</h1>

            {/* Mode Selection */}
            <div className="mode-toggle">
                <button
                    className={mode === "api" ? "mode-button active" : "mode-button"}
                    onClick={() => setMode("api")}
                >
                    🌍 Use API Data
                </button>
                <button
                    className={mode === "manual" ? "mode-button active" : "mode-button"}
                    onClick={() => setMode("manual")}
                >
                    ✍️ Enter Manually
                </button>
            </div>

            {/* 🌍 API Mode - City Input */}
            {mode === "api" && (
                <div className="predictor-content">
                    <form onSubmit={handlePredict} className="predict-form">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter City Name (e.g., Mumbai)"
                            className="city-input"
                            list="city-list"
                        />
                        <datalist id="city-list">
                            {citySuggestions.map((c, index) => (
                                <option key={index} value={c} />
                            ))}
                        </datalist>
                        <br /><br />
                        <button type="submit" disabled={loading} className="predict-button">
                            {loading ? "🔄 Predicting..." : "Predict"}
                        </button>
                    </form>
                </div>
            )}

            {/* ✍️ Manual Input Mode */}
            {mode === "manual" && (
                <div className="manual-inputs">
                    <form onSubmit={handlePredict} className="predict-form">
                        {/* 🌍 City Selection Box */}
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter City Name (e.g., Pune)"
                            className="manual-input-box"
                            list="city-list"
                        />
                        <datalist id="city-list">
                            {citySuggestions.map((c, index) => (
                                <option key={index} value={c} />
                            ))}
                        </datalist>

                        {/* 🌡️ Temperature Input */}
                        <input
                            type="number"
                            placeholder="🌡️ Temperature (°C)"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            className="manual-input-box"
                        />

                        {/* 💧 Humidity Input */}
                        <input
                            type="number"
                            placeholder="💧 Humidity (%)"
                            value={humidity}
                            onChange={(e) => setHumidity(e.target.value)}
                            className="manual-input-box"
                        />

                        {/* 🌀 Pressure Input */}
                        <input
                            type="number"
                            placeholder="🌀 Pressure (hPa)"
                            value={pressure}
                            onChange={(e) => setPressure(e.target.value)}
                            className="manual-input-box"
                        />

                        {/* 🌬️ Wind Speed Input */}
                        <input
                            type="number"
                            placeholder="🌬️ Wind Speed (m/s)"
                            value={windSpeed}
                            onChange={(e) => setWindSpeed(e.target.value)}
                            className="manual-input-box"
                        />

                        {/* ☁️ Cloud Cover Input */}
                        <input
                            type="number"
                            placeholder="☁️ Cloud Cover (%)"
                            value={cloudCover}
                            onChange={(e) => setCloudCover(e.target.value)}
                            className="manual-input-box"
                        />

                        <br />
                        <button type="submit" disabled={loading} className="predict-button">
                            {loading ? "🔄 Predicting..." : "Predict"}
                        </button>
                    </form>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Predictor;

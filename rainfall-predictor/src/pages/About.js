// import React from "react";
// import { Link } from "react-router-dom";

// const About = () => {
//     return (
//         <div style={{ textAlign: "center", padding: "50px", color: "#fff", backgroundColor: "#121212", minHeight: "100vh" }}>
            
//             {/* Navigation inside the page */}
//             <div className="absolute top-8 flex gap-6 bg-black/40 px-6 py-3 rounded-full">
//                 <Link to="/" className="text-white text-lg font-semibold hover:text-gray-300">Home</Link>
//                 <Link to="/about" className="text-white text-lg font-semibold hover:text-gray-300">About</Link>
//                 <Link to="/predictor" className="text-white text-lg font-semibold hover:text-gray-300">Predictor</Link>
//             </div>

//             <h1 style={{ fontSize: "36px", color: "#28a745" }}>About Rainfall Predictor</h1>
//             <p style={{ fontSize: "18px" }}>
//                 This project is an AI-driven rainfall prediction system that provides accurate rainfall forecasts using
//                 real-time weather data. Developed using Flask and React, it aims to help people plan ahead based on weather predictions.
//             </p>
//         </div>
//     );
// };

// export default About;



import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css"; // Import the new About.css

const About = () => {
    return (
        <div className="about-container">
            {/* 🔹 Navigation Bar */}
            <nav className="nav-bar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/predictor" className="nav-link">Predictor</Link>
            </nav>

            {/* 🔹 About Section */}
            <h1 className="about-title">About Rainfall Predictor</h1>
            <p className="about-text">
                This project is an AI-driven rainfall prediction system that provides accurate rainfall forecasts using
                real-time weather data. Developed using Flask and React, it aims to help people plan ahead based on weather predictions.
            </p>
        </div>
    );
};

export default About;

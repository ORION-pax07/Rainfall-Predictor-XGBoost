import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "../styles/Home.css"; // Import CSS file for styling
import homeImage1 from "../assets/homebackground.jpg";
import homeImage2 from "../assets/home-img-2.jpg";
import homeImage3 from "../assets/home-img-3.jpg";

const HomePage = () => {
    // State to manage image order and flipping animation
    const [imageOrder, setImageOrder] = useState([
        { src: homeImage1, position: 0 },
        { src: homeImage2, position: 1 },
        { src: homeImage3, position: 2 },
    ]);
    const [flippingIndex, setFlippingIndex] = useState(null);
    const [flippingType, setFlippingType] = useState(null); // Track whether it's a single or double flip

    // Initialize particles
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    // Function to handle the click and trigger the page-turn effect
    const bringToFront = (clickedIndex) => {
        const clickedImage = imageOrder[clickedIndex];

        if (clickedImage.position === 1) {
            // Clicking the middle image (single page turn)
            setFlippingIndex(clickedIndex);
            setFlippingType("single");

            setTimeout(() => {
                const newOrder = [...imageOrder];
                const clickedImage = newOrder[clickedIndex];

                // Remove the clicked image from its current position
                newOrder.splice(clickedIndex, 1);
                // Move the previous front image (position 2) to position 0
                const previousFront = newOrder.find((img) => img.position === 2);
                newOrder.splice(newOrder.indexOf(previousFront), 1);
                newOrder.unshift({ ...previousFront, position: 0 });
                // Move the clicked image to position 2 (front)
                newOrder.push({ ...clickedImage, position: 2 });

                // Update positions for the remaining image
                const remainingImageIndex = newOrder.findIndex(
                    (img) => img.position !== 0 && img.position !== 2
                );
                newOrder[remainingImageIndex] = { ...newOrder[remainingImageIndex], position: 1 };

                setImageOrder(newOrder);
                setFlippingIndex(null);
                setFlippingType(null);
            }, 800); // Match the animation duration (0.8s)
        } else if (clickedImage.position === 0) {
            // Clicking the last image (double page turn effect)
            setFlippingIndex(clickedIndex);
            setFlippingType("double");

            setTimeout(() => {
                const newOrder = [...imageOrder];
                const clickedImage = newOrder[clickedIndex];

                // Simulate double page turn:
                // 1st turn: Last (0) -> Middle (1), Middle (1) -> Front (2), Front (2) -> Last (0)
                // 2nd turn: Last (previously Front) -> Middle, Middle (previously Last) -> Front, Front (previously Middle) -> Last
                // Result: Last (0) -> Front (2), Front (2) -> Middle (1), Middle (1) -> Last (0)

                // Remove the clicked image (last, position 0)
                newOrder.splice(clickedIndex, 1);
                // Move the previous front (position 2) to position 1 (middle)
                const previousFront = newOrder.find((img) => img.position === 2);
                newOrder.splice(newOrder.indexOf(previousFront), 1);
                newOrder.push({ ...previousFront, position: 1 });
                // Move the previous middle (position 1) to position 0 (last)
                const previousMiddle = newOrder.find((img) => img.position === 1);
                newOrder.splice(newOrder.indexOf(previousMiddle), 1);
                newOrder.unshift({ ...previousMiddle, position: 0 });
                // Move the clicked image (last) to position 2 (front)
                newOrder.push({ ...clickedImage, position: 2 });

                setImageOrder(newOrder);
                setFlippingIndex(null);
                setFlippingType(null);
            }, 1600); // Double the animation duration (0.8s * 2 for double page turn)
        }
    };

    return (
        <div className="home-container">
            {/* Rainy Particle Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: "#0a192f" },
                    particles: {
                        number: { value: 150, density: { enable: true, area: 800 } },
                        shape: { type: "circle" },
                        size: { value: 2, random: true },
                        move: { enable: true, speed: 2 },
                        opacity: { value: 0.6, random: true },
                        links: { enable: true, distance: 100, color: "#00c6fb" },
                    }
                }}
                className="particles"
            />

            {/* Navigation Bar */}
            <nav className="nav-bar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/predictor" className="nav-link">Predictor</Link>
            </nav>

            {/* Main Hero Section */}
            <div className="hero">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Rainfall Predictor
                </motion.h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    AI-powered dashboard to predict rainfall using real-time weather data.
                </motion.p>
            </div>

            {/* 🌟 Interactive Image Stack (Like Devin's Site) */}
            <div className="image-stack">
                {imageOrder.map((image, index) => (
                    <img
                        key={index}
                        className={`stacked-img ${flippingIndex === index ? (flippingType === "single" ? "flipping-single" : "flipping-double") : ""}`}
                        data-position={image.position}
                        src={image.src}
                        alt={`Background ${index + 1}`}
                        onClick={() => bringToFront(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;


















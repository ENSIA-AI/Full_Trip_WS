import React, { useState } from "react";
import "./css/CarRentalCard.css";
import PaymentForm from "./PaymentForm";
import SignUpForm from "../../landingPage/components/SignUpForm.jsx"; // Adjust path if needed

function CarRentalCard({ id, image, name, model, price, location }) {
    const [showPayment, setShowPayment] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    // 1. Handle Rent Click
    const handleRentClick = () => {
        const userId = localStorage.getItem("user_id");

        if (userId) {
            // User IS logged in -> Show Payment
            setShowPayment(true);
        } else {
            // User IS NOT logged in -> Show Login
            setShowLogin(true);
        }
    };

    // 2. Callback: What happens after they log in?
    const handleLoginSuccess = () => {
        setShowLogin(false);  // Close Login
        setShowPayment(true); // Open Payment immediately
    };

    return (
        <>
            <div className="carrentalcard-card" id={`carrentalcard-card-${id}`}>
                <div className="carrentalcard-img-container">
                    <img src={image} alt={name} className="carrentalcard-img" />
                </div>

                <div className="carrentalcard-info">
                    <h2 className="carrentalcard-name">{name}</h2>
                    <p className="carrentalcard-model">Model: {model}</p>
                    <p className="carrentalcard-price">Price: {price} DA / day</p>
                    <p className="carrentalcard-location">📍 {location}</p>
                </div>

                <div className="carrentalcard-btn-container">
                    <button 
                        className="carrentalcard-rent-btn" 
                        onClick={handleRentClick}
                    >
                        Rent Now
                    </button>
                </div>
            </div>

            {/* 3. Conditional Rendering */}
            
            {showLogin && (
                <SignUpForm 
                    formAppearing={setShowLogin} // Allows form to close itself
                    onLoginSuccess={handleLoginSuccess} // Triggers payment after login
                />
            )}

            {showPayment && (
                <PaymentForm
                    carId={id}           
                    carName={name}       
                    pricePerDay={price}  
                    onClose={() => setShowPayment(false)}
                />
            )}
        </>
    );
}

export default CarRentalCard;
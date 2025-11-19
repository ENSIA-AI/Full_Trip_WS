import React, { useState } from "react";
import "./css/CarRentalCard.css";
import PaymentForm from "./PaymentForm";

function CarRentalCard({ id, image, name, model, price, rating, location }) {
  const [showPayment, setShowPayment] = useState(false);

  const openPayment = () => setShowPayment(true);
  const closePayment = () => setShowPayment(false);

  return (
    <>
      <div className="carrentalcard-card" id={`carrentalcard-card-${id}`}>
        <div
          className="carrentalcard-img-container"
          id={`carrentalcard-img-${id}`}
        >
          <img src={image} alt={name} className="carrentalcard-img" />
        </div>

        <div
          className="carrentalcard-info"
          id={`carrentalcard-info-${id}`}
        >
          <h2 className="carrentalcard-name">{name}</h2>
          <p className="carrentalcard-model">Model: {model}</p>
          <p className="carrentalcard-price">Price: {price} DA / day</p>
          <p className="carrentalcard-location">📍 {location}</p>
        </div>

        <div
          className="carrentalcard-btn-container"
          id={`carrentalcard-btn-${id}`}
        >
          <button
            className="carrentalcard-rent-btn"
            onClick={openPayment}
          >
            Rent Now
          </button>
        </div>
      </div>

      {showPayment && (
        <PaymentForm
          name={name}
          onClose={closePayment}
        />
      )}
    </>
  );
}

export default CarRentalCard;

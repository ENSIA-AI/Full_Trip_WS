import React from "react";
import "./css/CarRentalCard.css";
import PaymentForm from "./PaymentForm";

function CarRentalCard({ id, image, name, model, price, rating, location }) {
  return (
    <div className="carrentalcard-card" id={`carrentalcard-card-${id}`}>
      
      {/* Image */}
      <div className="carrentalcard-img-container" id={`carrentalcard-img-${id}`}>
        <img src={image} alt={name} className="carrentalcard-img" />
      </div>

      {/* Info */}
      <div className="carrentalcard-info" id={`carrentalcard-info-${id}`}>
        <h2 className="carrentalcard-name">{name}</h2>
        <p className="carrentalcard-model">Model: {model}</p>
        <p className="carrentalcard-price">Price: {price} DA / day</p>
        <p className="carrentalcard-location">📍 {location}</p>
      </div>

      {/* Button */}
      <div className="carrentalcard-btn-container" id={`carrentalcard-btn-${id}`}>
        <button className="carrentalcard-rent-btn">Rent Now</button>
      </div>

    </div>
  );
}

export default CarRentalCard;

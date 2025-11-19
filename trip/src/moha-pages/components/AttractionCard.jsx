import React, { useState } from "react";
import PaymentForm from "./PaymentForm";

function AttractionCard({ id, image, name, type, entryFee, rating, location }) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <>
      <div className="carrentalcard-card" id={`carrentalcard-card-${id}`}>
        <div className="carrentalcard-img-container">
          <img src={image} alt={name} className="carrentalcard-img" />
        </div>

        <div className="carrentalcard-info">
          <h2>{name}</h2>
          <p>Type: {type}</p>
          <p>Entry Fee: {entryFee} DA</p>
          <p>⭐ {rating} • {location}</p>
        </div>

       <div className="carrentalcard-btn-container">
          <button
            className="carrentalcard-rent-btn"
            onClick={() => setShowPaymentForm(true)}
          >
            Reserve Ticket
          </button>
        </div> 
      </div>

      {/* Modal OUTSIDE the card */}
      {showPaymentForm && (
        <PaymentForm
          name={name}
          onClose={() => setShowPaymentForm(false)}
        />
      )}
    </>
  );
}

export default AttractionCard;

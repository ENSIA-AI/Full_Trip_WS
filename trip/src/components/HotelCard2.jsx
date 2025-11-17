import React, { useState } from 'react';
import './css/HotelCard2.css';

function HotelCard2() {
  const [showPayment, setShowPayment] = useState(false);

  const handleReserve = () => {
    setShowPayment(true);
  };

  const handleClose = () => {
    setShowPayment(false);
  };

  return (
    <>
      <div className="hotel-card">
        <div className="hotel-image">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" 
            alt="Hotel lobby interior"
          />
        </div>
        
        <div className="hotel-details">
          <div className="header-section">
            <div>
              <h1 className="hotel-name">The Grand Plaza Hotel</h1>
              <div className="star-rating">
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star filled">★</span>
                <span className="star">★</span>
              </div>
            </div>
            <div className="rating-badge">9.2</div>
          </div>

          <div className="location">
            <svg className="location-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Manhattan, New York</span>
          </div>

          <p className="description">
            Luxurious 5-star hotel in the heart of Manhattan with stunning city views, world-class dining, and exceptional service.
          </p>

          <div className="amenities">
            <span className="amenity">Wi-Fi</span>
            <span className="amenity">Parking</span>
            <span className="amenity">Breakfast</span>
            <span className="amenity">Gym</span>
          </div>

          <div className="pricing">
            <div className="price">
              <span className="amount">299$</span>
              <span className="per-night">/ night</span>
            </div>
            <div className="total">
              <span className="total-label">Total:</span>
              <span className="total-amount">---</span>
            </div>
          </div>

          <button className="reserve-btn" onClick={handleReserve}>Reserve</button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-content">
            <h2>Payment Details</h2>
            <form className="payment-form">
              <label>
                Cardholder Name
                <input type="text" placeholder="John Doe" required />
              </label>
              <label>
                Card Number
                <input type="text" placeholder="1234 5678 9012 3456" required />
              </label>
              <div className="row">
                <label>
                  Expiry
                  <input type="text" placeholder="MM/YY" required />
                </label>
                <label>
                  CVV
                  <input type="text" placeholder="123" required />
                </label>
              </div>
              <button type="submit" className="pay-btn">
                Pay 299$
              </button>
            </form>
            <button className="close-btn" onClick={handleClose}>
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HotelCard2;

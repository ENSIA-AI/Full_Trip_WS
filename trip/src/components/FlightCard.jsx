import React, { useState } from "react";
import "./css/FlightCard.css";

function FlightCard() {
  const [showPayment, setShowPayment] = useState(false);

  const handleReserve = () => {
    setShowPayment(true);
  };

  const handleClose = () => {
    setShowPayment(false);
  };

  return (
    <>
      <div className="flight-card">
        <div className="date-header">
          02 November 2025 - 03 November 2025
        </div>

        <div className="flight-content">
          <div className="airline-section">
            <div className="airline-logo">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <div className="airline-info">
              <h2 className="airline-name">Emirates Airlines</h2>
              <p className="flight-number">E2-460</p>
            </div>
          </div>

          <div className="flight-details">
            <div className="location-section">
              <h3 className="location-label">Emirates</h3>
              <p className="location-name">Dubai Airport</p>
              <div className="departure-dot"></div>
              <p className="time">8:00 AM</p>
            </div>

            <div className="flight-path">
              <div className="duration-container">
                <svg className="plane-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
                <span className="duration">6h30m</span>
              </div>
              <div className="path-line"></div>
              <div className="stop-indicator">
                <div className="stop-dot"></div>
                <span className="stop-label">Non-Stop</span>
              </div>
            </div>

            <div className="location-section">
              <h3 className="location-label">UK</h3>
              <p className="location-name">London Airport</p>
              <div className="arrival-dot"></div>
              <p className="time">2:00 PM</p>
            </div>
          </div>

          <div className="booking-info">
            <div className="info-group">
              <span className="info-label">Price</span>
              <span className="price">399$</span>
            </div>
            <div className="info-group">
              <span className="info-label">Class</span>
              <span className="class-badge">Economy</span>
            </div>
            <div className="info-group">
              <span className="info-label">Status</span>
              <span className="status-badge">Active</span>
            </div>
          </div>
        </div>

        <div className="action-section">
          <button className="reserve-btn" onClick={handleReserve}>
            Reserve
          </button>
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
                Pay 399$
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

export default FlightCard;

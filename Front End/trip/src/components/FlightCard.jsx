import React, { useState } from "react";
import "./css/FlightCard.css";

function FlightCard() {
  const [showPayment, setShowPayment] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({});

  const handleReserve = () => {
    setShowPayment(true);
  };

  const handleClose = () => {
    setShowPayment(false);
    setCardName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setErrors({});
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    // allow letters and spaces only
    setCardName(value);
    setErrors((prev) => ({ ...prev, cardName: "" }));
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    // allow digits only
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digitsOnly);
    setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value;
    setExpiry(value);
    setErrors((prev) => ({ ...prev, expiry: "" }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "").slice(0, 3);
    setCvv(digitsOnly);
    setErrors((prev) => ({ ...prev, cvv: "" }));
  };

  const validate = () => {
    const newErrors = {};

    // Name: required + letters and spaces only
    if (!cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    } else if (!/^[A-Za-z\s]+$/.test(cardName.trim())) {
      newErrors.cardName = "Name must contain only letters";
    }

    // Card number: 16 digits
    if (!cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Expiry: MM/YY and not in past
    if (!expiry.trim()) {
      newErrors.expiry = "Expiry is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Expiry must be MM/YY";
    } else {
      const [m, y] = expiry.split("/").map(Number);
      const expDate = new Date(2000 + y, m - 1, 1);
      const now = new Date();
      now.setDate(1);
      if (expDate < now) {
        newErrors.expiry = "Expiry date cannot be in the past";
      }
    }

    // CVV: 3 digits
    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Flight reserved successfully! ✈️");
    handleClose();
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

      {showPayment && (
        <div className="flight-payment-overlay">
          <div className="flight-payment-modal">
            <button className="flight-payment-close" onClick={handleClose}>
              ×
            </button>
            <h2>Payment Details</h2>
            <form
              className="flight-payment-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flight-payment-group">
                <label>
                  Cardholder Name
                  <input
                    type="text"
                    value={cardName}
                    onChange={handleNameChange}
                    placeholder="John Doe"
                  />
                </label>
                {errors.cardName && (
                  <span className="flight-payment-error">
                    {errors.cardName}
                  </span>
                )}
              </div>

              <div className="flight-payment-group">
                <label>
                  Card Number
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleNumberChange}
                    placeholder="1234567890123456"
                    maxLength={16}
                  />
                </label>
                {errors.cardNumber && (
                  <span className="flight-payment-error">
                    {errors.cardNumber}
                  </span>
                )}
              </div>

              <div className="flight-payment-row">
                <div className="flight-payment-group">
                  <label>
                    Expiry
                    <input
                      type="text"
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                    />
                  </label>
                  {errors.expiry && (
                    <span className="flight-payment-error">
                      {errors.expiry}
                    </span>
                  )}
                </div>

                <div className="flight-payment-group">
                  <label>
                    CVV
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      maxLength={3}
                    />
                  </label>
                  {errors.cvv && (
                    <span className="flight-payment-error">
                      {errors.cvv}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="flight-pay-btn">
                Pay 399$
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FlightCard;

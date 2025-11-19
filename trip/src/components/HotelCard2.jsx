import React, { useState } from 'react';
import './css/HotelCard2.css';

function HotelCard2() {
  const [showPayment, setShowPayment] = useState(false);

  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  const handleReserve = () => {
    setShowPayment(true);
  };

  const handleClose = () => {
    setShowPayment(false);
    setPaymentData({ name: "", cardNumber: "", expiry: "", cvv: "" });
    setErrors({});
  };

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // keep only digits for card number
      const onlyDigits = value.replace(/\D/g, "");
      setPaymentData(prev => ({ ...prev, [name]: onlyDigits }));
    } else if (name === "cvv") {
      // keep only digits and max 3 chars
      const onlyDigits = value.replace(/\D/g, "").slice(0, 3);
      setPaymentData(prev => ({ ...prev, [name]: onlyDigits }));
    } else {
      setPaymentData(prev => ({ ...prev, [name]: value }));
    }

    setErrors(prev => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};

    // Name: required + letters and spaces only
    if (!paymentData.name.trim()) {
      newErrors.name = "Cardholder name is required";
    } else if (!/^[A-Za-z\s]+$/.test(paymentData.name.trim())) {
      newErrors.name = "Name must contain only letters";
    }

    // Card number: 16 digits
    if (!paymentData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(paymentData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Expiry: MM/YY basic check
    if (!paymentData.expiry.trim()) {
      newErrors.expiry = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiry)) {
      newErrors.expiry = "Use format MM/YY";
    }

    // CVV: 3 digits
    if (!paymentData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(paymentData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // mock payment success
    console.log("Payment data:", paymentData);
    alert("Payment successful (mock)");
    handleClose();
  }

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
            <form className="payment-form" onSubmit={handleSubmit}>
              <label>
                Cardholder Name
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={paymentData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </label>

              <label>
                Card Number
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234567890123456"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  maxLength={16}
                />
                {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
              </label>

              <div className="row">
                <label>
                  Expiry
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={paymentData.expiry}
                    onChange={handleChange}
                  />
                  {errors.expiry && <span className="error">{errors.expiry}</span>}
                </label>
                <label>
                  CVV
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    maxLength={3}
                  />
                  {errors.cvv && <span className="error">{errors.cvv}</span>}
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

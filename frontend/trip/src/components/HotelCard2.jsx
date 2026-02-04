import React, { useState } from 'react';
import './css/HotelCard2.css';
// ✅ Import the SignUpForm
import SignUpForm from "../landingPage/components/SignUpForm"; 

function HotelCard2({ hotel }) {
  // --- STATE ---
  const [showPayment, setShowPayment] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // ✅ Controls Login Popup

  // --- 1. Setup Defaults ---
  const name = hotel?.h_name || "The Grand Plaza Hotel";
  const location = hotel?.h_location || "Manhattan, New York";
  const price = hotel?.price || 299;
  const description = hotel?.h_description || "Luxurious 5-star hotel in the heart of the city with stunning views.";
  const rating = hotel?.h_rating || 9.2;
  const starCount = hotel?.h_stars ? parseInt(hotel.h_stars) : 5;
  const image = hotel?.h_image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";

  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});

  // --- 2. USER CHECK HELPER ---
  const getUserId = () => {
    const storedUser = localStorage.getItem("FT_user");
    if (!storedUser) return null;
    try {
      const userObj = JSON.parse(storedUser);
      return userObj.user_id || userObj.id || null;
    } catch (e) {
      return null;
    }
  };

  // --- 3. HANDLERS ---
  const handleReserve = () => {
    const userId = getUserId();
    if (userId) {
      // User is logged in, show payment
      setShowPayment(true);
    } else {
      // User NOT logged in, show Signup/Login
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowPayment(true); // Open payment immediately after login
  };

  const handleClose = () => {
    setShowPayment(false);
    setPaymentData({ name: "", cardNumber: "", expiry: "", cvv: "" });
    setErrors({});
  };

  function handleChange(e) {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      newValue = value.replace(/\D/g, ""); // Only digits
    } else if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 3); // Max 3 digits
    }

    setPaymentData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error for this field as user types
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  function validate() {
    const newErrors = {};

    // Name
    if (!paymentData.name.trim()) {
      newErrors.name = "Cardholder name is required";
    } else if (!/^[A-Za-z\s]+$/.test(paymentData.name.trim())) {
      newErrors.name = "Name must contain only letters";
    }

    // Card number
    if (!paymentData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(paymentData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Expiry
    if (!paymentData.expiry.trim()) {
      newErrors.expiry = "Required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiry)) {
      newErrors.expiry = "MM/YY";
    }

    // CVV
    if (!paymentData.cvv.trim()) {
      newErrors.cvv = "Required";
    } else if (!/^\d{3}$/.test(paymentData.cvv)) {
      newErrors.cvv = "3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // mock payment success
    console.log("Processing payment for:", name);
    alert(`Payment of $${price} successful for ${name}!`);
    handleClose();
  }

  return (
    <>
      <div className="hotel-card">
        <div className="hotel-image">
          <img src={image} alt={name} />
        </div>
        
        <div className="hotel-details">
          <div className="header-section">
            <div>
              <h1 className="hotel-name">{name}</h1>
              <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < starCount ? 'filled' : ''}`}>★</span>
                ))}
              </div>
            </div>
            <div className="rating-badge">{rating}</div>
          </div>

          <div className="location">
            <svg className="location-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{location}</span>
          </div>

          <p className="description">{description}</p>

          <div className="amenities">
            <span className="amenity">Wi-Fi</span>
            <span className="amenity">Parking</span>
            <span className="amenity">Breakfast</span>
            <span className="amenity">Gym</span>
          </div>

          <div className="pricing">
            <div className="price">
              <span className="amount">{price}$</span>
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

      {/* --- LOGIN OVERLAY --- */}
      {showLogin && (
        <div className="payment-modal" style={{background: 'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center'}}> 
           <SignUpForm 
             formAppearing={setShowLogin} 
             SetLoggedIn={handleLoginSuccess}
             SetUserInfo={() => {}} 
           />
        </div>
      )}

      {/* --- PAYMENT MODAL --- */}
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-content">
            <h2>Payment Details</h2>
            <p style={{marginBottom: '15px', color: '#666'}}>Booking: <strong>{name}</strong></p>
            
            <form className="payment-form" onSubmit={handleSubmit}>
              <label>
                Cardholder Name
                <input
                  className={errors.name ? "input-error" : ""}
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
                  className={errors.cardNumber ? "input-error" : ""}
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
                    className={errors.expiry ? "input-error" : ""}
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
                    className={errors.cvv ? "input-error" : ""}
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
                Pay {price}$
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
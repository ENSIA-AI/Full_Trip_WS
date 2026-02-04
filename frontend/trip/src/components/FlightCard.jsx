import React, { useState } from "react";
import "./css/FlightCard.css"; 
// ✅ Import the SignUpForm so we can show it if they aren't logged in
import SignUpForm from "../landingPage/components/SignUpForm"; 

function formatTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function FlightCard({ flight, returnDate = null, onBooked }) {
  // --- STATE ---
  const [showPayment, setShowPayment] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // ✅ Controls the Login Popup

  // Payment Form State
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  // --- 1. USER CHECK HELPER ---
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

  // --- 2. HANDLE RESERVE CLICK ---
  const handleReserveClick = () => {
    const userId = getUserId();
    if (userId) {
      // User is logged in, go straight to payment
      setShowPayment(true);
    } else {
      // User is NOT logged in, show Sign Up form
      setShowLogin(true);
    }
  };

  // --- 3. HANDLE LOGIN SUCCESS ---
  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowPayment(true); // Open payment immediately after login
  };

  // --- DATA MAPPING ---
  const f = flight ? {
    id: flight.flight_id || flight.id,
    departure_time: flight.departure_full_iso || new Date().toISOString(), 
    arrival_time: flight.arrival_full_iso || new Date().toISOString(),
    departure_code: flight.depart_airport || "DEP",
    departure_city: flight.depart_country || "Departure City",
    arrival_code:   flight.des_airport    || "ARR",
    arrival_city:   flight.des_country    || "Arrival City",
    airline_name:   flight.airline_name || `Flight #${flight.flight_id}`,
    flight_number:  `FL-${flight.flight_id}`,
    duration:       flight.duration_formatted || "0h",
    stops:          flight.stops === 0 ? "Non-Stop" : `${flight.stops} Stop(s)`,
    price:          Number(flight.price) || 0,
    class:          flight.class || "Economy",
    status:         flight.status || "Scheduled"
  } : null;

  if (!f) return null;

  // --- PAYMENT HANDLERS ---
  const handleClose = () => {
    setShowPayment(false);
    setCardName(""); setCardNumber(""); setExpiry(""); setCvv(""); setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!cardName.trim()) newErrors.cardName = "Required";
    if (!cardNumber || cardNumber.length < 16) newErrors.cardNumber = "Invalid Card";
    if (!expiry) newErrors.expiry = "Required";
    if (!cvv || cvv.length < 3) newErrors.cvv = "Invalid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const paymentData = { cardName, cardNumber, expiry, cvv };

    if (onBooked) {
        await onBooked(f.id, f.price, paymentData);
    }
    handleClose();
  };

  const dateLabel = returnDate
    ? `${formatDate(f.departure_time)} - ${formatDate(returnDate)}`
    : formatDate(f.departure_time);

  return (
    <>
      {/* --- ORIGINAL UI PRESERVED --- */}
      <div className="flight-card">
        <div className="date-header">{dateLabel}</div>

        <div className="flight-content">
          {/* AIRLINE */}
          <div className="airline-section">
            <div className="airline-logo">
               <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
            </div>
            <div className="airline-info">
              <h2 className="airline-name">{f.airline_name}</h2>
              <p className="flight-number">{f.flight_number}</p>
            </div>
          </div>

          {/* FLIGHT DETAILS */}
          <div className="flight-details">
            <div className="location-section">
              <h3 className="location-label">{f.departure_code}</h3>
              <p className="location-name">{f.departure_city}</p>
              <div className="departure-dot"></div>
              <p className="time">{formatTime(f.departure_time)}</p>
            </div>

            <div className="flight-path">
              <div className="duration-container">
                <svg className="plane-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                <span className="duration">{f.duration}</span>
              </div>
              <div className="path-line"></div>
              <div className="stop-indicator">
                <div className="stop-dot"></div>
                <span className="stop-label">{f.stops}</span>
              </div>
            </div>

            <div className="location-section">
              <h3 className="location-label">{f.arrival_code}</h3>
              <p className="location-name">{f.arrival_city}</p>
              <div className="arrival-dot"></div>
              <p className="time">{formatTime(f.arrival_time)}</p>
            </div>
          </div>

          {/* PRICE & BUTTON */}
          <div className="booking-info">
            <div className="info-group">
              <span className="info-label">Price</span>
              <span className="price">${f.price.toFixed(0)}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Class</span>
              <span className="class-badge">{f.class}</span>
            </div>
            <div className="info-group">
              <span className="info-label">Status</span>
              <span className={`status-badge ${f.status === 'Scheduled' ? 'green' : 'gray'}`} 
                    style={{color: f.status === 'Scheduled' ? 'green' : 'gray'}}>
                {f.status}
              </span>
            </div>
          </div>
        </div>

        <div className="action-section">
          {/* ✅ Changed onClick to check login first */}
          <button className="reserve-btn" onClick={handleReserveClick}>Reserve</button>
        </div>
      </div>
      
      {/* --- LOGIN OVERLAY (Shows if user not logged in) --- */}
      {showLogin && (
        <div className="flight-payment-overlay"> 
           {/* Wrapping SignUpForm in your overlay style so it centers correctly */}
           <SignUpForm 
             formAppearing={setShowLogin} 
             SetLoggedIn={handleLoginSuccess}
             SetUserInfo={() => {}} 
           />
        </div>
      )}

      {/* --- PAYMENT MODAL (Uses YOUR original structure) --- */}
      {showPayment && (
        <div className="flight-payment-overlay">
           <div className="flight-payment-modal">
             <button className="flight-payment-close" onClick={handleClose}>×</button>
             <h2>Payment Details</h2>
             
             <form className="flight-payment-form" onSubmit={handleSubmit}>
                {/* Wrapped inputs in divs to match your CSS .flight-payment-group */}
                <div className="flight-payment-group">
                    <label>Card Name</label>
                    <input 
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        placeholder="John Doe"
                    />
                </div>

                <div className="flight-payment-group">
                    <label>Card Number</label>
                    <input 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)} 
                        maxLength="16"
                        placeholder="0000 0000 0000 0000"
                    />
                </div>
                
                <div className="flight-payment-row">
                    <div className="flight-payment-group" style={{width: '100%'}}>
                        <label>Expiry</label>
                        <input 
                            value={expiry} 
                            onChange={(e) => setExpiry(e.target.value)} 
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="flight-payment-group" style={{width: '100%'}}>
                        <label>CVV</label>
                        <input 
                            value={cvv} 
                            onChange={(e) => setCvv(e.target.value)} 
                            maxLength="3"
                            placeholder="123"
                        />
                    </div>
                </div>
                
                <button type="submit" className="flight-pay-btn">
                    Pay ${f.price.toFixed(0)}
                </button>
             </form>
           </div>
        </div>
      )}
    </>
  );
}

export default FlightCard;
import React, { useState } from "react";
import "./css/FlightCard.css";

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
  const [showPayment, setShowPayment] = useState(false);
  
  // Payment Form State
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  // --- DATA MAPPING FOR YOUR TABLE STRUCTURE ---
  const f = flight ? {
    id: flight.flight_id,
    
    // Use the combined ISO strings we created in PHP
    departure_time: flight.departure_full_iso, 
    arrival_time: flight.arrival_full_iso,

    // Location Info
    departure_code: flight.depart_airport || "DEP",
    departure_city: flight.depart_country || "Departure City",
    arrival_code:   flight.des_airport    || "ARR",
    arrival_city:   flight.des_country    || "Arrival City",

    // Flight Info
    airline_name:   flight.airline_name || `Flight #${flight.flight_id}`,
    flight_number:  `FL-${flight.flight_id}`,
    duration:       flight.duration_formatted || "0h",
    stops:          flight.stops === 0 ? "Non-Stop" : `${flight.stops} Stop(s)`,
    
    // Cost & Status
    price:  flight.price,
    class:  flight.class,
    status: flight.status
  } : {
    // Demo Fallback
    id: 999,
    airline_name: 'Demo Airlines',
    flight_number: 'D-123',
    departure_code: 'DXB',
    departure_city: 'Dubai',
    arrival_code: 'LHR',
    arrival_city: 'London',
    departure_time: new Date().toISOString(),
    arrival_time: new Date().toISOString(),
    duration: '6h 30m',
    stops: 'Non-Stop',
    price: 399,
    class: 'Economy',
    status: 'Scheduled'
  };

  const handleReserve = () => setShowPayment(true);

  const handleClose = () => {
    setShowPayment(false);
    setCardName(""); setCardNumber(""); setExpiry(""); setCvv(""); setErrors({});
  };

  // Simple handlers
  const handleNameChange = (e) => setCardName(e.target.value);
  const handleNumberChange = (e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16));
  const handleExpiryChange = (e) => setExpiry(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3));

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
    if (onBooked) await onBooked(f.id);
    alert("Flight Reserved Successfully!");
    handleClose();
  };

  const dateLabel = returnDate
    ? `${formatDate(f.departure_time)} - ${formatDate(returnDate)}`
    : formatDate(f.departure_time);

  return (
    <>
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
              <span className="price">${Number(f.price).toFixed(0)}</span>
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
          <button className="reserve-btn" onClick={handleReserve}>Reserve</button>
        </div>
      </div>
      
      {/* Payment Modal (Simplified for brevity - keep your existing modal JSX here) */}
      {showPayment && (
        <div className="flight-payment-overlay">
           <div className="flight-payment-modal">
             <button className="flight-payment-close" onClick={handleClose}>×</button>
             <h2>Payment Details</h2>
             <form className="flight-payment-form" onSubmit={handleSubmit}>
                <input placeholder="Name" value={cardName} onChange={handleNameChange} className="flight-payment-group" />
                <input placeholder="Card Number" value={cardNumber} onChange={handleNumberChange} className="flight-payment-group" />
                <div className="flight-payment-row">
                    <input placeholder="MM/YY" value={expiry} onChange={handleExpiryChange} />
                    <input placeholder="CVV" value={cvv} onChange={handleCvvChange} />
                </div>
                <button type="submit" className="flight-pay-btn">Pay ${Number(f.price).toFixed(0)}</button>
             </form>
           </div>
        </div>
      )}
    </>
  );
}

export default FlightCard;
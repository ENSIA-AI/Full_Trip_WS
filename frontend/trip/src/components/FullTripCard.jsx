import React, { useState } from 'react';
import './css/Fulltrip.css'; 

export default function TravelBooking() {
  const [bookingData, setBookingData] = useState({
    title: "Paris: City of Lights",
    location: "Paris, France",
    duration: "7 Days / 6 Nights",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop",
    includes: [
      { icon: "✈️", label: "Flight" },
      { icon: "🏨", label: "Hotel" },
      { icon: "🍽️", label: "Meals" },
      { icon: "📸", label: "Tours" }
    ],
    highlights: [
      "Eiffel Tower",
      "Seine River cruise with dinner",
      "Day Trip to Versailles Palace",
      "Louis Museum Tour"
    ],
    pricePerPerson: 2999,
    tickets: 2,
    status: "Active",
    departureDate: "Dec 15 2025"
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const totalPrice = bookingData.pricePerPerson * bookingData.tickets;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!paymentInfo.cardNumber || !paymentInfo.cardName || !paymentInfo.expiry || !paymentInfo.cvv) {
      alert('Please fill in all fields');
      return;
    }
    // Payment confirmed
    setPaymentCompleted(true);
    setShowPaymentForm(false);
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        {/* Header */}
        <div className="booking-header">
          <h1>{bookingData.title}</h1>
          <div className="rating">
            ⭐ {bookingData.rating} ({bookingData.reviews})
          </div>
        </div>

        <div className="booking-content">
          {/* Left Column - Image */}
          <div className="booking-image">
            <img src={bookingData.image} alt={bookingData.title} />
          </div>

          {/* Right Column - Details */}
          <div className="booking-details">
            {/* Location and Duration */}
            <div className="location-duration">
              <div>📍 {bookingData.location}</div>
              <div>⏰ {bookingData.duration}</div>
            </div>

            {/* Includes Section */}
            <div className="includes-section">
              <h2>Includes:</h2>
              <div className="includes-list">
                {bookingData.includes.map((item, index) => (
                  <div key={index} className="include-item">
                    <span className="include-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="highlights-section">
              <h2>Highlights:</h2>
              <div className="highlights-list">
                {bookingData.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    📸 {highlight}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="pricing">
              <div className="price-per-person">
                ${bookingData.pricePerPerson} / Person
              </div>
              <div className="total-price">
                Total: ${totalPrice}
              </div>
            </div>

            {/* Booking Details */}
            <div className="booking-info">
              <div>👥 Tickets: {bookingData.tickets}</div>
              <div>Status: {bookingData.status}</div>
              <div>Departure: {bookingData.departureDate}</div>
            </div>

            {/* Payment Section */}
            {!paymentCompleted && !showPaymentForm && (
              <button
                className="reserve-button"
                onClick={() => setShowPaymentForm(true)}
              >
                Pay Now
              </button>
            )}

            {showPaymentForm && (
              <form className="payment-form" onSubmit={handlePaymentSubmit}>
                <h3>Payment Details</h3>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card"
                  value={paymentInfo.cardName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={paymentInfo.expiry}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                />
                <button type="submit">Confirm Payment</button>
              </form>
            )}

            {paymentCompleted && (
              <div className="payment-success">
                ✅ Payment Confirmed. Reservation Complete!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

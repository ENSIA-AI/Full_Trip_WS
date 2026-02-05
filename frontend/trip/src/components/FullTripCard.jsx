import React, { useEffect, useState } from "react";
import "./css/Fulltrip.css";

export default function TravelBooking() {
  const [bookingData, setBookingData] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });

  const getUserId = () => {
    const user = localStorage.getItem("FT_user");
    if (!user) return null;
    try {
      return JSON.parse(user).user_id;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    fetch("http://localhost/Full_Trip_WS/backend/oussama/full_trip/get_trip.php?trip_id=1")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBookingData({
            ...data.trip,
            includes: data.includes,
            highlights: data.highlights,
            tickets: 2
          });
        }
      });
  }, []);

  if (!bookingData) return null;

  const totalPrice = bookingData.price_per_person * bookingData.tickets;

  const handlePay = (e) => {
    e.preventDefault();

    const userId = getUserId();
    if (!userId) {
      alert("You must login first");
      return;
    }

    fetch("http://localhost/Full_Trip_WS/backend/oussama/full_trip/book_trip.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        trip_id: bookingData.trip_id,
        tickets: bookingData.tickets,
        total_price: totalPrice
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPaymentDone(true);
          setShowPayment(false);
        }
      });
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h1>{bookingData.title}</h1>

        <img src={bookingData.image} alt="" />

        <p>📍 {bookingData.location}</p>
        <p>⏰ {bookingData.duration}</p>

        <h3>Includes</h3>
        {bookingData.includes.map((i, idx) => (
          <div key={idx}>{i.icon} {i.label}</div>
        ))}

        <h3>Highlights</h3>
        {bookingData.highlights.map((h, idx) => (
          <div key={idx}>📸 {h}</div>
        ))}

        <h2>${bookingData.price_per_person} / Person</h2>
        <h2>Total: ${totalPrice}</h2>

        {!paymentDone && !showPayment && (
          <button onClick={() => setShowPayment(true)}>Pay Now</button>
        )}

        {showPayment && (
          <form onSubmit={handlePay}>
            <input placeholder="Card Number" required />
            <input placeholder="Name on Card" required />
            <input placeholder="MM/YY" required />
            <input placeholder="CVV" required />
            <button type="submit">Confirm Payment</button>
          </form>
        )}

        {paymentDone && (
          <div className="payment-success">
            ✅ Payment Confirmed
          </div>
        )}
      </div>
    </div>
  );
}

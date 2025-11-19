import React, { useState } from "react";
import "./css/PaymentForm.css";

function PaymentForm({ name, onClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({ cardNumber: "", expiry: "", cvv: "" });

  const validate = () => {
    const newErrors = {};

    // Card number: 16 digits
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Expiry: MM/YY and not in the past
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Expiry must be MM/YY";
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const expiryDate = new Date(2000 + year, month - 1, 1);
      const now = new Date();
      now.setDate(1); // ignore day
      if (expiryDate < now) {
        newErrors.expiry = "Expiry date cannot be in the past";
      }
    }

    // CVV: 3 digits
    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Ticket for ${name} reserved successfully! 🎉`);
      onClose();
    }
  };

  return (
    <div className="paymentform-overlay">
      <div className="paymentform-modal">
        <h2>Reserve Ticket for {name}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="paymentform-group">
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="attraction-error">{errors.cardNumber}</div>
          </div>

          <div className="paymentform-group">
            <input
              type="text"
              placeholder="Expiry MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <div className="attraction-error">{errors.expiry}</div>
          </div>

          <div className="paymentform-group">
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <div className="attraction-error">{errors.cvv}</div>
          </div>

          <div className="paymentform-buttons">
            <button type="submit">Pay & Reserve</button>
            <button type="button" className="paymentform-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;

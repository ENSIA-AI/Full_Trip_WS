import React, { useState } from "react";
import "./css/PaymentForm.css"; // Ensure you have this CSS file

function PaymentForm({ carId, carName, pricePerDay, onClose }) {
    
    // State for DB columns: pickup_d, return_d, pickup_l, return_l
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [pickupLoc, setPickupLoc] = useState("Algiers"); 
    const [returnLoc, setReturnLoc] = useState("Algiers");
    
    const handlePayment = async (e) => {
        e.preventDefault();
        
        const userId = localStorage.getItem("user_id");
        if (!userId) {
            alert("Error: You must be logged in.");
            return;
        }

        // Map data to match PHP & Database columns
        const reservationData = {
            user_id: userId,
            car_id: carId,
            pickup_d: pickupDate,
            return_d: returnDate,
            pickup_l: pickupLoc,
            return_l: returnLoc
        };

        try {
            // ✅ Make sure this URL matches your folder structure
            const response = await fetch("http://localhost/FULL_TRIP_WS/backend/Mohammed/Cars/reserve_car.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservationData),
            });

            const result = await response.json();

            if (result.success) {
                alert("Payment Successful! Reservation Saved.");
                onClose(); // Close the modal
            } else {
                alert("Failed: " + result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Connection error. Please try again.");
        }
    };

    return (
        <div className="paymentform-overlay">
            <div className="paymentform-content">
                <button className="close-btn" onClick={onClose} style={{float:'right'}}>X</button>
                <h2>Book: {carName}</h2>
                <p>Price: {pricePerDay} DA / day</p>

                <form onSubmit={handlePayment} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                    
                    <label>Pickup Date:</label>
                    <input type="date" required value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />

                    <label>Return Date:</label>
                    <input type="date" required value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />

                    <label>Pickup Location:</label>
                    <input type="text" required value={pickupLoc} onChange={(e) => setPickupLoc(e.target.value)} />

                    <label>Return Location:</label>
                    <input type="text" required value={returnLoc} onChange={(e) => setReturnLoc(e.target.value)} />

                    <button type="submit" className="pay-btn" style={{marginTop:'15px', padding:'10px'}}>
                        Confirm & Pay
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PaymentForm;
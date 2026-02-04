import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, faA, faM, faBolt, faGasPump, 
    faClock, faMapLocation, faSpinner 
} from '@fortawesome/free-solid-svg-icons';
import './Styles/CarRentals.css';

// Fallback image
import DefaultCar from './Images/bmw.svg'; 

function CarCard({ Car, onCancel }) {
    // 1. Calculate Days and Total Price dynamically
    const start = new Date(Car.pickup_d);
    const end = new Date(Car.return_d);
    const diffTime = Math.abs(end - start);
    // Ensure at least 1 day is counted
    const daysRented = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = daysRented * Car.price;

    return (
        <div className="Section" style={{ backgroundColor: "white", marginBottom: "20px" }}>
            <div className='Car'>
                <img 
                    src={Car.car_image_url || DefaultCar} 
                    alt={Car.model} 
                    onError={(e) => {e.target.src = DefaultCar}} 
                />
                <div className='CarDetails'>

                    <div className='CarType'>
                        {Car.car_type}
                    </div>

                    <h2>{`${Car.car_brand} ${Car.model}`}</h2>

                    <div className='Amenities'>
                        {/* car_passengers from cars table */}
                        <div className='Amenitie'> 
                            <FontAwesomeIcon icon={faUser} /> 
                            {`${Car.car_passengers} Passenger${(Car.car_passengers > 1) ? "s" : ""}`}
                        </div>
                        
                        {/* transmission from cars table */}
                        <div className='Amenitie'> 
                            <FontAwesomeIcon icon={(Car.transmission === "Automatic") ? faA : faM} /> 
                            {Car.transmission}
                        </div>
                        
                        {/* fuel_type from cars table */}
                        <div className='Amenitie'> 
                            <FontAwesomeIcon icon={(Car.fuel_type === "Electric" ? faBolt : faGasPump)} /> 
                            {Car.fuel_type}
                        </div>
                    </div>

                    <p className='Price'>Price/Day: <span>{Car.price} DA</span></p>
                    <p className='Price'>Total: <span>{totalPrice} DA</span></p>

                    <div className='Res_info'>
                        <div className="NightsRes">
                            <h4>Days Rented:</h4>
                            <p>{daysRented}</p>
                        </div>
                        <div className="HStatus">
                            <h4>Status:</h4>
                            <div className={Car.status}>{Car.status}</div>
                        </div>
                        <div className="DateIn">
                            <h4>Pick up:</h4>
                            {/* pickup_d and pickup_l from car_reservations */}
                            <p><FontAwesomeIcon icon={faClock} className='Icon' /> {Car.pickup_d}</p>
                            <p><FontAwesomeIcon icon={faMapLocation} className='Icon' /> {Car.pickup_l}</p>
                        </div>
                        <div className="DateOut">
                            <h4>Return:</h4>
                            {/* return_d and return_l from car_reservations */}
                            <p><FontAwesomeIcon icon={faClock} className='Icon' /> {Car.return_d}</p>
                            <p><FontAwesomeIcon icon={faMapLocation} className='Icon' /> {Car.return_l}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button 
                    className="SecondaryB RemoveCard" 
                    onClick={() => onCancel(Car.creservation_id)}
                >
                    Cancel Reservation
                </button>
            </div>
        </div>
    );
}

function CarRentals() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // 2. Fetch Logic
    useEffect(() => {
        // Getting user ID from localStorage as discussed
        const storedUser = localStorage.getItem("FT_user");
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                // "user_id" matches your users table PK
                const uid = userObj.user_id || userObj.id; 
                setUserId(uid);
                fetchReservations(uid);
            } catch (e) {
                console.error("User parse error");
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchReservations = async (uid) => {
        try {
            const response = await fetch(`http://localhost/FULL_TRIP_WS/backend/Mohammed/Cars/get_my_reservations.php?user_id=${uid}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setReservations(data);
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. Cancel Logic
    const handleCancel = async (reservationId) => {
        if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

        try {
            const response = await fetch('http://localhost/FULL_TRIP_WS/backend/Mohammed/Cars/cancel_reservation.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reservation_id: reservationId })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Remove from UI immediately
                setReservations(prev => prev.filter(r => r.creservation_id !== reservationId));
            } else {
                alert("Failed to cancel: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            alert("Connection error");
        }
    };

    if (loading) {
        return (
            <div className="S_Container Section" style={{textAlign:'center', marginTop:'50px'}}>
                <h2><FontAwesomeIcon icon={faSpinner} spin /> Loading...</h2>
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="S_Container Section" style={{textAlign:'center', marginTop:'50px'}}>
                <h2>Please log in to view your reservations.</h2>
            </div>
        );
    }

    return (
        <div className="S_Container Section">
            <div className="SecHeader">
                <h1>My Car Reservation</h1>
                <p>Manage your Car Rentals</p>
            </div>

            {reservations.length > 0 ? (
                reservations.map((res) => (
                    <CarCard 
                        key={res.creservation_id} 
                        Car={res} 
                        onCancel={handleCancel} 
                    />
                ))
            ) : (
                <div style={{textAlign:'center', padding:'40px', color:'#666'}}>
                    <h3>No reservations found.</h3>
                </div>
            )}
        </div>
    );
}

export default CarRentals;
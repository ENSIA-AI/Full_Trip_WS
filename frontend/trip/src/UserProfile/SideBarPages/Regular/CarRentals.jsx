import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, faA, faM, faBolt, faGasPump, 
    faClock, faMapLocation, faSpinner, faTriangleExclamation,
    faPenToSquare 
} from '@fortawesome/free-solid-svg-icons';
import './Styles/CarRentals.css';
import DefaultCar from './Images/bmw.svg'; 

// -------------------------------------------------------------------
// 1. CONFIRMATION MODAL COMPONENT
// -------------------------------------------------------------------
function CancelModal({ onClose, onConfirm, isExpiredAction }) {
    return (
        <div className="paymentform-overlay">
            <div className="Section" style={{ 
                backgroundColor: "white", 
                padding: "30px", 
                borderRadius: "12px", 
                maxWidth: "400px", 
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
            }}>
                <div style={{ color: "#e74c3c", fontSize: "40px", marginBottom: "15px" }}>
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                </div>
                <h2>{isExpiredAction ? "Delete from History?" : "Cancel Reservation?"}</h2>
                <p style={{ color: "#666", marginBottom: "25px" }}>
                    {isExpiredAction 
                        ? "This rental period has ended. Would you like to remove it from your history?" 
                        : "Are you sure you want to cancel this booking? This action cannot be undone."}
                </p>
                
                <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                    <button 
                        onClick={onClose}
                        style={{
                            padding: "10px 20px",
                            border: "1px solid #ccc",
                            backgroundColor: "white",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Keep it
                    </button>
                    <button 
                        onClick={onConfirm}
                        style={{
                            padding: "10px 20px",
                            border: "none",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        {isExpiredAction ? "Yes, Delete" : "Yes, Cancel"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// -------------------------------------------------------------------
// 2. CAR CARD COMPONENT
// -------------------------------------------------------------------
function CarCard({ Car, onActionClick, onEditClick }) {
    // FIX: Replace space with T to ensure Safari/Firefox parse MySQL dates correctly
    // Example: "2024-10-10 10:00:00" -> "2024-10-10T10:00:00"
    const safePickup = Car.pickup_d ? Car.pickup_d.replace(" ", "T") : new Date().toISOString();
    const safeReturn = Car.return_d ? Car.return_d.replace(" ", "T") : new Date().toISOString();

    const start = new Date(safePickup);
    const end = new Date(safeReturn);
    const now = new Date();

    // LOGIC 1: Edit is allowed only BEFORE the pickup date starts
    const isEditable = now < start;

    // LOGIC 2: If the current date is PAST the return date, it's "Expired" (Delete logic)
    const isExpired = now > end;

    const diffTime = Math.abs(end - start);
    const daysRented = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = daysRented * Number(Car.price);

    return (
        <div className="Section" style={{ backgroundColor: "white", marginBottom: "20px" }}>
            <div className='Car'>
                <img 
                    src={Car.car_image_url || DefaultCar} 
                    alt={Car.model} 
                    onError={(e) => {e.target.src = DefaultCar}} 
                />
                <div className='CarDetails'>
                    <div className='CarType'>{Car.car_type}</div>
                    <h2>{`${Car.car_brand} ${Car.model}`}</h2>

                    <div className='Amenities'>
                        <div className='Amenitie'> 
                            <FontAwesomeIcon icon={faUser} /> 
                            {`${Car.car_passengers} Passenger${(Car.car_passengers > 1) ? "s" : ""}`}
                        </div>
                        <div className='Amenitie'> 
                            <FontAwesomeIcon icon={(Car.transmission === "Automatic") ? faA : faM} /> 
                            {Car.transmission}
                        </div>
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
                            <p><FontAwesomeIcon icon={faClock} className='Icon' /> {Car.pickup_d}</p>
                            <p><FontAwesomeIcon icon={faMapLocation} className='Icon' /> {Car.pickup_l}</p>
                        </div>
                        <div className="DateOut">
                            <h4>Return:</h4>
                            <p><FontAwesomeIcon icon={faClock} className='Icon' /> {Car.return_d}</p>
                            <p><FontAwesomeIcon icon={faMapLocation} className='Icon' /> {Car.return_l}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                
                {/* EDIT BUTTON: Only visible if BEFORE pickup date and NOT cancelled */}
                {isEditable && Car.status !== 'Cancelled' && (
                    <button 
                        className="SecondaryB"
                        style={{ 
                            backgroundColor: "#3498db", 
                            borderColor: "#3498db", 
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                        onClick={() => onEditClick(Car)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </button>
                )}

                {/* CANCEL / DELETE BUTTON */}
                <button 
                    className="SecondaryB RemoveCard" 
                    onClick={() => onActionClick(Car.creservation_id, isExpired)}
                    style={isExpired ? { backgroundColor: "#555", borderColor: "#555" } : {}}
                >
                    {isExpired ? "Delete from History" : "Cancel Reservation"}
                </button>
            </div>
        </div>
    );
}

// -------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------
function CarRentals() {
    const navigate = useNavigate(); 
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // Modal state
    const [cancelTargetId, setCancelTargetId] = useState(null);
    const [isExpiredTarget, setIsExpiredTarget] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("FT_user");
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
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

    const confirmAction = async () => {
        if (!cancelTargetId) return;

        try {
            const response = await fetch('https://full-trip.onrender.com/Mohammed/Cars/cancel_reservation.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reservation_id: cancelTargetId })
            });
            
            const result = await response.json();
            
            if (result.success) {
                setReservations(prev => prev.filter(r => r.creservation_id !== cancelTargetId));
                setCancelTargetId(null);
            } else {
                alert("Action failed: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            alert("Connection error");
        }
    };

    // NAVIGATE TO FORM WITH DATA
    const handleEdit = (carData) => {
        // Navigates to the search/form page, passing the specific reservation data
        // FIX: Changed path to '/Car Rental' to match App.js
        navigate('/Car Rental', { 
            state: { 
                editMode: true, 
                reservationToEdit: carData 
            } 
        });
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
                        onEditClick={handleEdit}
                        onActionClick={(id, isExpired) => {
                            setCancelTargetId(id);
                            setIsExpiredTarget(isExpired);
                        }} 
                    />
                ))
            ) : (
                <div style={{textAlign:'center', padding:'40px', color:'#666'}}>
                    <h3>No reservations found.</h3>
                </div>
            )}

            {cancelTargetId && (
                <CancelModal 
                    isExpiredAction={isExpiredTarget}
                    onClose={() => setCancelTargetId(null)} 
                    onConfirm={confirmAction} 
                />
            )}
        </div>
    );
}

export default CarRentals;
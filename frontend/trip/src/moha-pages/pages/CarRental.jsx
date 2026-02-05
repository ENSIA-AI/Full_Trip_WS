import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Added for routing
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import CarRentalForm from "../components/CarRentalForm";
import CarRentalCard from "../components/CarRentalCard";
import Footer from "../../landingPage/components/Footer"
import "./css/CarRental.css";

// IMPORT SLIDER IMAGES
import top1 from "../img/CarRental/Uber.jpg";
import top2 from "../img/CarRental/Yassir.png";
import top3 from "../img/CarRental/inDrive.png";
import top4 from "../img/CarRental/heetch.png";
import top5 from "../img/CarRental/Careem.svg";
import top6 from "../img/CarRental/turo.webp";

// IMPORT DEFAULT CAR IMAGE
import carImg from "../img/Car.webp";

function CarRental() {
  const formRef = useRef(null);
  
  // 1. ROUTER HOOKS
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we are in Edit Mode (passed from CarRentals.jsx)
  const { editMode, reservationToEdit } = location.state || {};

  // 2. STATE MANAGEMENT
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState(null);
  const [sortType, setSortType] = useState("");

  // 3. FETCH FUNCTION (Search Logic)
  const fetchCars = async (searchCriteria = {}) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/FULL_TRIP_WS/backend/Mohammed/Cars/search_cars.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchCriteria),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setCars(data);
        setSortType(""); 
      } else {
        console.error("PHP Error:", data);
        setCars([]);
      }
    } catch (error) {
      console.error("Connection Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch default cars if NOT in edit mode
  useEffect(() => {
    if (!editMode) {
        fetchCars(); 
    }
  }, [editMode]);

  // 4. HANDLE SEARCH SUBMIT (Normal Mode)
  const handleSearch = (formData) => {
    const payload = {
      car_type: formData.carType,       
      location: formData.pickupLocation, 
      brand_model: ""                    
    };

    setCurrentSearchParams({
        startDate: formData.pickupDate,
        endDate: formData.dropoffDate,
        location: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation
    });

    fetchCars(payload);
  };

  // 5. HANDLE UPDATE SUBMIT (Edit Mode)
  const handleUpdateReservation = async (formData) => {
    if (!reservationToEdit) return;

    // Prepare payload for update_reservation.php
    const payload = {
        creservation_id: reservationToEdit.creservation_id, // Identifies the row to update
        pickup_d: formData.pickupDate,
        return_d: formData.dropoffDate,
        pickup_l: formData.pickupLocation,
        return_l: formData.dropoffLocation
        // Note: We are keeping the same Car ID, just updating dates/locations.
    };

    try {
        const response = await fetch("http://localhost/FULL_TRIP_WS/backend/Mohammed/Cars/update_reservation.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
            alert("Reservation updated successfully!");
            // Redirect back to the Profile/Reservations page
            navigate("/car-rentals"); 
        } else {
            alert(result.message || "Failed to update reservation.");
        }
    } catch (error) {
        console.error("Update Error:", error);
        alert("An error occurred while connecting to the server.");
    }
  };

  // 6. SORTING LOGIC
  const handleSortChange = (e) => {
    const type = e.target.value;
    setSortType(type);

    const sortedCars = [...cars];

    if (type === "price_asc") {
        sortedCars.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (type === "price_desc") {
        sortedCars.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (type === "name_asc") {
        sortedCars.sort((a, b) => {
            const nameA = `${a.car_brand} ${a.model}`.toLowerCase();
            const nameB = `${b.car_brand} ${b.model}`.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    }
    setCars(sortedCars);
  };

  // Slider Logic
  const sliderImages = [
    { src: top1, label: "Uber" },
    { src: top2, label: "Yassir" },
    { src: top3, label: "In Drive" },
    { src: top4, label: "Heetch" },
    { src: top5, label: "Careem" },
    { src: top6, label: "Turo" }
  ];

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // --- STYLES ---
  const sortContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "10px",
    position: "relative",
    zIndex: 10
  };

  const sortWrapperStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "10px 25px",
    background: "rgba(255, 255, 255, 0.9)",
    border: "2px solid #ff7e5f", 
    borderRadius: "50px", 
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  };

  const selectStyle = {
    padding: "8px 10px",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "black",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    appearance: "none", 
    textAlign: "center"
  };

  return (
    <div className="carrental-main-container">

      <h1 style={{marginTop:"50px"}} className="carrental-scroll-h1" onClick={scrollToForm}>
        <span className="carrental-h1-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.8em" height="1.8em">
            <path d="M3 13h1v-2H3v2zm2-4h16l1.5 4h-19L5 9zm16 6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-12 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm14-8h-3V4c0-1.1-.9-2-2-2H7C5.9 2 5 2.9 5 4v3H2v2h1v6c0 1.1.9 2 2 2h1c0 1.1.9 2 2 2s2-.9 2-2h4c0 1.1.9 2 2 2s2-.9 2-2h1c1.1 0 2-.9 2-2v-6h1V7z" />
          </svg>
        </span>
        {editMode ? "Update Your Reservation" : "Book Your Ride"}
      </h1>

      {/* Only show slider in normal mode */}
      {!editMode && <Slider images={sliderImages} />}

      <div className="carrental-form-wrapper" ref={formRef}>
        <CarRentalForm 
            onSearch={editMode ? handleUpdateReservation : handleSearch} 
            initialData={editMode ? reservationToEdit : null}
            isEditMode={editMode}
        />
      </div>

      {/* Only show results and sort bar in normal mode */}
      {!editMode && (
        <>
            <div style={sortContainerStyle}>
                <div 
                    className="sort-bar-hover-effect"
                    style={sortWrapperStyle}
                >
                    <label htmlFor="sortCars" style={{ color: "#ff7e5f", fontSize: "1.1rem", fontWeight: "bold" }}>
                        Sort Results:
                    </label>
                    
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <select 
                            id="sortCars"
                            value={sortType}
                            onChange={handleSortChange}
                            style={selectStyle}
                        >
                            <option value="" style={{color: "black"}}>Recommended</option>
                            <option value="price_asc" style={{color: "black"}}>Price: Low to High</option>
                            <option value="price_desc" style={{color: "black"}}>Price: High to Low</option>
                            <option value="name_asc" style={{color: "black"}}>Name: A - Z</option>
                        </select>
                        <span style={{ color: "#ff7e5f", marginLeft: "5px", pointerEvents: "none" }}>▼</span>
                    </div>
                </div>
            </div>

            <div className="carrental-cards-container">
                {loading ? (
                    <h3 style={{color:'white', textAlign:'center', marginTop:'30px'}}>Loading available cars...</h3>
                ) : cars.length > 0 ? (
                    cars.map((car) => (
                        <CarRentalCard
                            key={car.car_id}
                            id={car.car_id}
                            image={car.car_image_url ? car.car_image_url : carImg}
                            name={`${car.car_brand} ${car.model}`}
                            model={car.car_type} 
                            price={car.price}
                            location={car.location || "Algeria"}
                            searchParams={currentSearchParams} 
                        />
                    ))
                ) : (
                    <h3 style={{color:'white', textAlign:'center', marginTop:'30px'}}>No cars found matching your criteria.</h3>
                )}
            </div>
        </>
      )}

      <Footer></Footer>
    </div>
  );
}

export default CarRental;
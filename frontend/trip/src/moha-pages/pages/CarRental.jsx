import React, { useRef, useState, useEffect } from "react";
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

// IMPORT DEFAULT CAR IMAGE (Fallback)
import carImg from "../img/Car.webp";

function CarRental() {
  const formRef = useRef(null);

  // 1. STATE MANAGEMENT
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // 2. FETCH FUNCTION (Connects to PHP)
  const fetchCars = async (searchParams = {}) => {
    setLoading(true);
    try {
      // ✅ MAKE SURE THIS URL IS CORRECT FOR YOUR LOCALHOST
      const response = await fetch("http://localhost:8000/backend/Mohammed/Cars/search_cars.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchParams),
      });

      const data = await response.json();

      // Check if data is an array before setting state
      if (Array.isArray(data)) {
        setCars(data);
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

  // 3. LOAD ALL CARS ON PAGE LOAD
  useEffect(() => {
    fetchCars(); 
  }, []);

  // 4. HANDLE FORM SUBMIT
  const handleSearch = (formData) => {
    // Map React Form fields -> PHP expected fields
    const payload = {
      car_type: formData.carType,         // "economy", "suv", etc.
      location: formData.pickupLocation,  // "Algiers", "Oran"
      brand_model: ""                     // Optional: leave empty for now
    };

    console.log("Sending to PHP:", payload); // Debugging line
    fetchCars(payload);
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

  return (
    <div className="carrental-main-container">

      <h1 style={{marginTop:"50px"}}
        className="carrental-scroll-h1"
        onClick={scrollToForm}
      >
        <span className="carrental-h1-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="1.8em"
            height="1.8em"
          >
            <path d="M3 13h1v-2H3v2zm2-4h16l1.5 4h-19L5 9zm16 6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-12 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm14-8h-3V4c0-1.1-.9-2-2-2H7C5.9 2 5 2.9 5 4v3H2v2h1v6c0 1.1.9 2 2 2h1c0 1.1.9 2 2 2s2-.9 2-2h4c0 1.1.9 2 2 2s2-.9 2-2h1c1.1 0 2-.9 2-2v-6h1V7z" />
          </svg>
        </span>
        Book Your Ride
      </h1>

      <Slider images={sliderImages} />

      {/* FORM SECTION */}
      <div className="carrental-form-wrapper" ref={formRef}>
        {/* Pass the handleSearch function down to the form */}
        <CarRentalForm onSearch={handleSearch} />
      </div>

      {/* CARDS SECTION */}
      <div className="carrental-cards-container">
        
        {loading ? (
           <h3 style={{color:'white', textAlign:'center'}}>Loading available cars...</h3>
        ) : cars.length > 0 ? (
          // Map through the database results
          cars.map((car) => (
            <CarRentalCard
              key={car.car_id}
              id={car.car_id}
              // Use DB image or fallback to local import
              image={car.car_image_url ? car.car_image_url : carImg}
              name={`${car.car_brand} ${car.model}`}
              model={car.car_type} 
              price={car.price}
              location={car.location || "Algeria"}
            />
          ))
        ) : (
          <h3 style={{color:'white', textAlign:'center'}}>No cars found matching your criteria.</h3>
        )}

      </div>
      <Footer></Footer>
    </div>
  );
}

export default CarRental;
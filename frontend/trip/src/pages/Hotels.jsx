import Navbar from "../components/Navbar";
import Searcharea from "../components/Searchbar";
import Hotelcard2 from "../components/HotelCard2";
import Footer2 from "../components/Footer2";
import hotelIcon from './pics/hotel.png';

// Import Slider Images
import top1 from './pics/top1.jpg';
import top2 from './pics/top2.avif';
// (Keep your other imports here)

import { useRef, useState, useEffect } from "react";
import './css/page.css';

function Hotels() {
    const resultRef = useRef(null);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- 1. THE FETCH FUNCTION ---
    const fetchHotels = async (searchParams = {}) => {
        setLoading(true);
        setError(null);
        try {
            // ✅ UPDATED URL: Matches the path you provided
            const response = await fetch("http://localhost/Full_Trip_WS/backend/oussama/hotels/hotelsearch.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(searchParams),
            });

            if (!response.ok) throw new Error("Failed to connect to server");

            const data = await response.json();

            if (Array.isArray(data)) {
                setHotels(data);
            } else {
                console.error("PHP Error:", data);
                setHotels([]); 
            }
        } catch (err) {
            console.error("Connection Error:", err);
            setError("Failed to fetch hotels. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    // --- 2. LOAD ALL HOTELS ON PAGE LOAD ---
    useEffect(() => {
        fetchHotels(); 
    }, []);

    // --- 3. HANDLE SEARCH SUBMIT ---
    const handleSearch = (formData) => {
        const payload = {
            place: formData.place,
            budget: formData.budget,
        };

        console.log("Searching with:", payload);
        fetchHotels(payload);
        
        if (resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <h1 className="header" style={{ cursor: "pointer" }}>
                <img src={hotelIcon} className="icon" alt="icon" /> Reserve Your Spot
            </h1>

            {/* Slider Section */}
            <section className="container">
                <div className="slider-wrapper">
                    <div className="slider">
                        <div className="slide" id="slide-1">
                            <img src={top1} alt="top1" />
                            <div className="pic-overlay"><h2>1. Capella Bangkok</h2></div>
                        </div>
                        <div className="slide" id="slide-2">
                             <img src={top2} alt="top2" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="output">
                <div className="search" ref={resultRef}>
                    <Searcharea onSearch={handleSearch} />
                </div>

                <div className="outputarea">
                    {loading ? (
                        <h3 style={{textAlign: "center", color: "white"}}>Loading hotels...</h3>
                    ) : error ? (
                        <h3 style={{textAlign: "center", color: "red"}}>{error}</h3>
                    ) : hotels.length > 0 ? (
                        hotels.map((hotel, index) => (
                            <Hotelcard2 
                                key={hotel.hotel_id || index} 
                                hotel={hotel} 
                            />
                        ))
                    ) : (
                        <h3 style={{textAlign: "center", color: "white"}}>No hotels found matching your criteria.</h3>
                    )}
                </div>
            </div>
            
            <Footer2 />
        </>
    );
}

export default Hotels;
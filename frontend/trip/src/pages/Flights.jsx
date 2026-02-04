import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import FlightCard from "../components/FlightCard.jsx";
import Footer2 from "../components/Footer2"
import Searcharea from "../components/SearchbarF.jsx"; // Assuming this is your file name
import { useLocation } from "react-router-dom";

// Images
import top1 from './pics/Atop1.jpg'
import top2 from './pics/Atop2.jpg'
import top3 from './pics/Atop3.jpg'
import top4 from './pics/Atop4.avif'
import top5 from './pics/Atop5.webp'
import top6 from './pics/Atop6.webp'
import top7 from './pics/Atop7.jpg'
import top8 from './pics/Atop8.avif'
import top9 from './pics/Atop9.webp'
import top10 from './pics/Atop10.avif'
import plane from './pics/plane-departure-solid-full.svg'

import './css/page.css'

function Flights() {
    const { state } = useLocation();
    const refrence = useRef(null);
    
    // State
    const [flights, setFlights] = useState([]);
    const [returnFlights, setReturnFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState(null);

    // Scroll handling
    useEffect(() => {
        if (state) {
             window.scrollTo(0, 400);
        }
    }, [state]);

    // --- 1. THE FETCH FUNCTION ---
    const fetchFlights = async (params = {}) => {
        setIsLoading(true);
        setError(null);
        try {
            // ✅ UPDATED URL: Matches your folder structure
            const response = await fetch("http://localhost/Full_Trip_WS/backend/oussama/flights/flightssearch.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params),
            });

            if (!response.ok) throw new Error("Failed to connect to server");

            const data = await response.json();

            // PHP returns { outbound: [...], return: [...] }
            if (data.outbound || data.return) {
                setFlights(data.outbound || []);
                setReturnFlights(data.return || []);
            } else if (Array.isArray(data)) {
                 // Fallback if PHP returns simple array
                setFlights(data);
                setReturnFlights([]);
            } else {
                setFlights([]);
                setReturnFlights([]);
            }

        } catch (err) {
            console.error("Connection Error:", err);
            setError("Failed to fetch flights. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- 2. LOAD INITIAL FLIGHTS (Optional) ---
    useEffect(() => {
        // Automatically fetch all flights when page loads (empty params)
        fetchFlights({}); 
    }, []);

    // --- 3. HANDLE SEARCH ---
    const handleSearch = (params) => {
        setSearchParams(params);
        fetchFlights(params);
        
        if (refrence.current) {
            refrence.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    // Placeholder for Booking (You can implement the fetch for booking later)
    const handleBookFlight = async (flightId) => {
        alert(`Booking Flight ID: ${flightId} for ${searchParams?.passengers || 1} passengers. (Backend pending)`);
    };

    function handleScroll() {
        refrence.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }

    return (
        <>
            <h1 className="header" onClick={handleScroll} style={{ cursor: "pointer" }}>
                <img src={plane} className="icon" alt="icon" /> Fly Beyond Limits
            </h1>

            <section className="container">
                <div className="slider-wrapper">
                    <div className="slider">
                        <div className="slide">
                            <img id="slide-1" src={top1} alt="top1" />
                            <div className="pic-overlay"><h2>1. Singapore Changi Airport (Singapore)</h2></div>
                        </div>
                        <div className="slide">
                            <img id="slide-2" src={top2} alt="top2" />
                            <div className="pic-overlay"><h2>2. Hamad International Airport (Doha, Qatar)</h2></div>
                        </div>
                        {/* ... Add other slides as needed ... */}
                         <div className="slide">
                            <img id="slide-3" src={top3} alt="top3" />
                             <div className="pic-overlay"><h2>3. Tokyo International Airport (Haneda)</h2></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="output">
                <div className="search" ref={refrence}>
                    <Searcharea
                        onSearch={handleSearch}
                        isLoading={isLoading}
                        initialDate={state?.date}
                        initialDestination={state?.to}
                        initialBudget={state?.budget}
                    />
                </div>

                <div className="outputarea">
                    {isLoading && <h3 style={{textAlign: "center", color: "white"}}>Loading flights...</h3>}
                    
                    {error && <h3 style={{textAlign: "center", color: "red"}}>{error}</h3>}
                    
                    {!isLoading && !error && flights.length === 0 && (
                        <h3 style={{textAlign: "center", color: "white"}}>No flights found.</h3>
                    )}

                    {/* OUTBOUND FLIGHTS */}
                    {flights.map(flight => (
                        <FlightCard 
                            key={flight.flight_id || flight.id} 
                            flight={flight} 
                            onBooked={() => handleBookFlight(flight.flight_id || flight.id)}
                        />
                    ))}

                    {/* RETURN FLIGHTS (If Round Trip) */}
                    {returnFlights.length > 0 && (
                        <>
                            <h2 style={{color: 'white', marginTop: '2rem', textAlign:'center'}}>Return Flights</h2>
                            <hr style={{width: '50%', margin: '10px auto'}}/>
                            {returnFlights.map(flight => (
                                <FlightCard 
                                    key={flight.flight_id || flight.id} 
                                    flight={flight} 
                                    onBooked={() => handleBookFlight(flight.flight_id || flight.id)}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
            
            <Footer2 />
        </>
    );
}

export default Flights;
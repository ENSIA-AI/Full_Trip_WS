import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import FlightCard from "../components/FlightCard.jsx";
import { searchFlights, bookFlight } from "../services/flights_service";
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
import Footer2 from "../components/Footer2"
import Searcharea from "../components/SearchbarF.jsx";

import { useLocation } from "react-router-dom";

import './css/page.css'

function Flights() {
    const { state } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 400);
    }, [state]);
    /* const slider = document.querySelector('.slider');
   let scrollAmount = 0;

   setInterval(() => {
        const slideWidth = slider.clientWidth; 
        scrollAmount += slideWidth; 

       if (scrollAmount >= slider.scrollWidth) {
           scrollAmount = 0;
       }

       slider.scrollTo({
           left: scrollAmount,
           behavior: 'smooth'
       });
   }, 3000);
 
*/
    const refrence = useRef(null);
    const [flights, setFlights] = useState([]);
    const [returnFlights, setReturnFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState(null);

    const handleSearch = async (params) => {
        setIsLoading(true);
        setError(null);
        setSearchParams(params);
        try {
            const res = await searchFlights(params);
            setFlights(res.data?.outbound || []);
            setReturnFlights(res.data?.return || []);
        } catch (err) {
            setError(err.message || 'Failed to search flights');
            setFlights([]);
            setReturnFlights([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookFlight = async (flightId) => {
        await bookFlight(flightId, '', searchParams?.passengers || 1);
    };

    function handleScroll() {

        refrence.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

    }

    return (<>


        <h1 className="header" onClick={handleScroll} style={{ cursor: "pointer" }}><img src={plane} className="icon" /> Fly Beyond Limits</h1>

        <section className="container">
            <div className="slider-wrapper">
                <div className="slider">
                    <div className="slide">
                        <img id="slide-1" src={top1} alt="top1" />
                        <div className="pic-overlay">
                            <h2>1. Singapore Changi Airport (Singapore)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-2" src={top2} alt="top2" />
                        <div className="pic-overlay">
                            <h2>2. Hamad International Airport (Doha, Qatar)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-3" src={top3} alt="top3" />
                        <div className="pic-overlay">
                            <h2>3. Tokyo International Airport (Haneda) (Tokyo, Japan)</h2>
                        </div>
                    </div>



                    <div className="slide">
                        <img id="slide-4" src={top4} alt="top4" />
                        <div className="pic-overlay">
                            <h2>4. Incheon International Airport (Seoul, South Korea)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-5" src={top5} alt="top5" />
                        <div className="pic-overlay">
                            <h2>5. Narita International Airport (Tokyo, Japan)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-6" src={top6} alt="top6" />
                        <div className="pic-overlay">
                            <h2>6. Hong Kong International Airport (Hong Kong)</h2>
                        </div>
                    </div>



                    <div className="slide">
                        <img id="slide-7" src={top7} alt="top7" />
                        <div className="pic-overlay">
                            <h2>7. Paris Charles de Gaulle Airport (Paris, France)</h2>
                        </div>
                    </div>
                    <div className="slide">
                        <img id="slide-8" src={top8} alt="top8" />
                        <div className="pic-overlay">
                            <h2>8. Rome Fiumicino Airport (Rome, Italy)</h2>
                        </div>
                    </div>

                    <div className="slide">
                        <img id="slide-9" src={top9} alt="top9" />
                        <div className="pic-overlay">
                            <h2>9. Munich Airport (München, Germany)</h2>
                        </div>
                    </div>

                    <div className="slide">
                        <img id="slide-10" src={top10} alt="top10" />
                        <div className="pic-overlay">
                            <h2>10. Zurich Airport (Zurich, Switzerland)</h2>
                        </div>
                    </div>
                    <div className="slider-nav">
                        <a href="#slide-1"></a>
                        <a href="#slide-2"></a>
                        <a href="#slide-3"></a>
                        <a href="#slide-4"></a>
                        <a href="#slide-5"></a>
                        <a href="#slide-6"></a>
                        <a href="#slide-7"></a>
                        <a href="#slide-8"></a>
                        <a href="#slide-9"></a>
                        <a href="#slide-10"></a>
                    </div>
                </div>
            </div>
        </section>

        <div className="output" >
            <div className="search" ref={refrence}>
                <Searcharea
                    onSearch={handleSearch}
                    isLoading={isLoading}
                    initialDate={state?.date}
                    initialDestination={state?.to}
                    initialBudget={state?.budget}
                ></Searcharea>
            </div>

            <div className="outputarea">
                {isLoading && <p>Loading flights...</p>}
                {error && <p className="error">{error}</p>}
                {!isLoading && !error && flights.length === 0 && searchParams && <p>No flights found.</p>}
                {flights.map(flight => (
                    <FlightCard 
                        key={flight.id} 
                        flight={flight} 
                        onBooked={() => handleBookFlight(flight.id)}
                    />
                ))}
                {returnFlights.length > 0 && (
                    <>
                        <h3>Return Flights</h3>
                        {returnFlights.map(flight => (
                            <FlightCard 
                                key={flight.id} 
                                flight={flight} 
                                onBooked={() => handleBookFlight(flight.id)}
                            />
                        ))}
                    </>
                )}
            </div>

        </div>
        <Footer2></Footer2>

    </>);
}
export default Flights;
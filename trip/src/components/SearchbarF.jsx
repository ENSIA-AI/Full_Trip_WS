import './css/Searcharea.css';
import React, { useState, useEffect } from 'react';
function SearchareaF() {
    const today = new Date().toISOString().split('T')[0];

    const [checkin, setCheckin] = useState(today);
    const [checkout, setCheckout] = useState(today);
    const [placeholder, setPlaceholder] = useState("Getting your location...");


    function handleclick() { 
        if(checkin > checkout) { 
            alert("⭕⭕Invalide Date interval⭕⭕")
        }
    }
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                        );
                        const data = await response.json();

                        const city =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.county ||
                            "Unknown location";

                            setPlaceholder(city);

                    } catch(err) { 
                        console.error("Error fetchin the city: ",err);
                        setPlaceholder("Unable to get city");
                    }
                    },
                    
                () => {
                    setPlaceholder("Location permission denided");
                }
            );
        } else {
            setPlaceholder("Geolocation is not supported by this browser.");
        }
    }, []);

    return (<>
     <form className='inforamtions'>
        
            <form className="distination">
                <input type='text' id='source' placeholder={placeholder} />
                <input type='text' id='Distination' placeholder='Distination' />
            </form>
            <form>
                <input type="date" name="checkin" id="checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                <input type="date" id="checkout" name="checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
            </form>
            <form className="persons">
                <input type="number" min="0" name="adults" id="adults" placeholder='Adults' />
                <input type="number" min="0" name="Children" id="Children" placeholder='Childrens' />
                <input type="number" min="0" name="Pets" id="Pets" placeholder='Pets' />
            </form>
            <input type="number" id="Budget" min="0" placeholder='Enter your budget (ex.: 50$)' />
            
           <button className='form' onClick={handleclick}>Search</button>
        
        </form>
        
    </>);
}


export default SearchareaF
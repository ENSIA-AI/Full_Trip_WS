

import { useState } from 'react';
import './css/navbar.css';
import LOGO from '../pages/pics/pic1.png';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={LOGO} alt="ourlogo" />
                <h2>TravelWUs</h2>
            </div>

            <button 
                className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li><a href="/" onClick={closeMenu}>Home</a></li>
                <li><a href="/" onClick={closeMenu}>Hotels</a></li>
                <li><a href="/flights" onClick={closeMenu}>Flights</a></li>
                <li><a href="/carrental" onClick={closeMenu}>Car Rental</a></li>
                <li><a href="/carrental" onClick={closeMenu}>Attractions</a></li>
                <li><a href="/attractions" onClick={closeMenu}>Full Trip</a></li>
            </ul>
            
            <div className="buttons">
                <button>Sign in</button>
                <button>Sign up</button>
            </div>

            {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
        </nav>
    );
}

export default Navbar;
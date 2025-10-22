import './css/navbar.css';
import LOGO from '../pages/pics/pic1.png';
function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={LOGO} alt="ourlogo" />
                <h2>TravelWUs</h2>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/hotels">Hotels</a></li>
                    <li><a href="/flights">Flights</a></li>
                    <li><a href="/carrental">Car Rental</a></li>
                    <li><a href="/attractions">Attractions</a></li>
                </ul>
            </nav>
            <div className="buttons">
                <button>Sign in</button>
                <button>Sign up</button>
            </div>

        </nav>
    );
}


export default Navbar
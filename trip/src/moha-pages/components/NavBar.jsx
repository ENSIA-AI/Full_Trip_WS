import React from "react";
import "./css/NavBar.css";

function NavBar() {
  return (
    <nav id="navbar" className="navbar">
      <ul id="navbar-list" className="navbar-list">

        <li id="nav-home" className="nav-item">Home</li>
        <li id="nav-hotels" className="nav-item">Hotels</li>
        <li id="nav-flights" className="nav-item">Flights</li>
        <li id="nav-carrental" className="nav-item">CarRental</li>
        <li id="nav-attractions" className="nav-item">Attractions</li>
        <li id="nav-fulltrip" className="nav-item">Full Trip</li>

      </ul>
    </nav>
  );
}

export default NavBar;

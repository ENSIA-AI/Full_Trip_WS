import React, { useRef } from "react";
import NavBar from "../components/NavBar"
import Slider from "../components/Slider";
import AttractionForm from "../components/AttractionForm";
import AttractionCard from "../components/AttractionCard";
import Footer from "../../landingPage/components/Footer";
import "./css/Attraction.css";
import Cardimg from '../img/Card.jpg'

import top1 from "../img/Attractions/top1.webp";
import top2 from "../img/Attractions/top2.jpg";
import top3 from "../img/Attractions/top3.jpg";
import top4 from "../img/Attractions/Colossuim.jpg";
import top5 from "../img/Attractions/NotreDame.jpg";
import top6 from "../img/Attractions/top6.webp";
import top7 from "../img/Attractions/centralPark.avif"
import top8 from "../img/Attractions/Burj khalifa.jpg"
import top9 from "../img/Attractions/top9.jpg"
import top10 from "../img/Attractions/top10.jpg"



// Placeholder images array for Slider
const sliderImages = [
  { src: top1, label: "The forbidden City - China" },
  { src: top2, label: "Al-Masjid al-Haram- Macca" },
  { src: top3, label: "The Giza Pyramids" },
  { src: top4, label: "Colosseum — Italy, Rome" },
  { src: top5, label: "Notre Dame Cathedral — France, Paris" },
  { src: top6 , label: "Eiffel Tower — France, Paris" },
  { src: top7 , label: "Central Park — United States, New York City" },
  { src: top8, label: "Burj Khalifa — United Arab Emirates, Dubai" },
  { src: top9, label: "Taj Mahal — India, Agra" },
  { src: top10, label: "Maqam El Chahid (Martyrs’ Memorial) — Algeria, Algiers" },
];

function Attractions() {
  const formRef = useRef(null);

  const scrollToForm = () => {
  formRef.current?.scrollIntoView({ behavior: "smooth" });
};


  return (
    <div className="attractions-main-container">

      {/* Navbar */}
      <NavBar />

      {/* Scroll H1 Button */}
      <h1 className="attractions-scroll-h1" onClick={scrollToForm}>
        <span className="attractions-h1-icon">
          {/* SVG attraction icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8H21L16.545 12.91L18.18 19L12 15.27L5.82 19L7.455 12.91L3 8H8.91L12 2Z"/>
          </svg>
        </span>
        Explore Attractions
      </h1>

      {/* Slider */}
      <Slider images={sliderImages} />

      {/* Attraction Form */}
      <div className="attractions-form-wrapper" ref={formRef}>
        <AttractionForm />
      </div>

      {/* Attraction Cards */}
      <div className="attractions-cards-container">
        <AttractionCard
          id={1}
          image={Cardimg}
          name="Ancient Museum"
          type="Museum"
          entryFee={500}
          rating={4.8}
          location="Algiers"
        />
        <AttractionCard
          id={2}
          image={Cardimg}
          name="City Park"
          type="Park"
          entryFee={0}
          rating={4.5}
          location="Oran"
        />
        <AttractionCard
          id={3}
          image={Cardimg}
          name="Historic Fort"
          type="Historic"
          entryFee={300}
          rating={4.7}
          location="Constantine"
        />
      </div>
      
        <Footer></Footer>
    </div>
  );
}

export default Attractions;

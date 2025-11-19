import React, { useRef } from "react";

import Slider from "../components/Slider";
import CarRentalForm from "../components/CarRentalForm";
import CarRentalCard from "../components/CarRentalCard";
import Footer from "../../landingPage/components/Footer"

import "./css/CarRental.css";

import top1 from "../img/CarRental/Uber.jpg";
import top2 from "../img/CarRental/Yassir.png";
import top3 from "../img/CarRental/inDrive.png";
import top4 from "../img/CarRental/heetch.png";
import top5 from "../img/CarRental/Careem.svg";
import top6 from "../img/CarRental/turo.webp";

import carImg from "../img/Car.webp";

function CarRental() {
  const formRef = useRef(null); 

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




      <h1 
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
      <path d="M3 13h1v-2H3v2zm2-4h16l1.5 4h-19L5 9zm16 6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-12 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm14-8h-3V4c0-1.1-.9-2-2-2H7C5.9 2 5 2.9 5 4v3H2v2h1v6c0 1.1.9 2 2 2h1c0 1.1.9 2 2 2s2-.9 2-2h4c0 1.1.9 2 2 2s2-.9 2-2h1c1.1 0 2-.9 2-2v-6h1V7z"/>
    </svg>
  </span>
  Book Your Ride
</h1>


  
      <Slider images={sliderImages} />


      <div className="carrental-form-wrapper" ref={formRef}>
        <CarRentalForm />
      </div>

      <div className="carrental-cards-container">

        <CarRentalCard
          id={1}
          image={carImg}
          name="Audi A4"
          model="2023"
          price="15000"
          location="Algiers"
        />

        <CarRentalCard
          id={2}
          image={carImg}
          name="BMW M3"
          model="2022"
          price="18000"
          location="Oran"
        />

        <CarRentalCard
          id={3}
          image={carImg}
          name="Golf 7"
          model="2020"
          price="9000"
          location="Constantine"
        />

      </div>
      <Footer></Footer>
    </div>
  );
}

export default CarRental;

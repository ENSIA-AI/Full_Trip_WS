import React, { useEffect, useRef } from "react";
import "./css/Slider.css";

function Slider({ images }) {

  const sliderRef = useRef(null);
  let scrollAmount = 0;

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const interval = setInterval(() => {
      const slideWidth = slider.clientWidth;
      scrollAmount += slideWidth;

      if (scrollAmount >= slider.scrollWidth) {
        scrollAmount = 0;
      }

      slider.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="slider-wrapper" className="slider-wrapper">
      <div id="slider" className="slider" ref={sliderRef}>

        {images.map((img, index) => (
          <div id={`slide-${index + 1}`} className="slide" key={index}>
            <img src={img.src} alt={`slide-${index + 1}`} className="slide-img" />
            <div className="slide-overlay">
              <h2>{index + 1}. {img.label}</h2>
            </div>
          </div>
        ))}

        <div id="slider-nav" className="slider-nav">
          {images.map((_, index) => (
            <a key={index} href={`#slide-${index + 1}`} className="nav-btn"></a>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Slider;

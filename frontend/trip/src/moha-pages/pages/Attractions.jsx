import React, { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Slider from "../components/Slider";
import AttractionForm from "../components/AttractionForm";
import AttractionCard from "../components/AttractionCard";
import Footer from "../../landingPage/components/Footer";
import "./css/Attraction.css";

import top1 from "../img/Attractions/top1.webp";
// ... باقي الصور

const sliderImages = [
  { src: top1, label: "The forbidden City - China" },
  // ...
];

function Attractions() {
  const formRef = useRef(null);


  const [attractionsList, setAttractionsList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = async (searchData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/FULL_TRIP_WS/backend/Mohammed/Attractions/search_attractions.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAttractionsList(data);
      setHasSearched(true);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error connecting to server. Make sure the PHP terminal is open.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attractions-main-container">
      <NavBar />
      
      <h1 className="attractions-scroll-h1" onClick={scrollToForm}>
        Explore Attractions
      </h1>
      
      <Slider images={sliderImages} />

      <div className="attractions-form-wrapper" ref={formRef}>
        <AttractionForm onSearch={handleSearch} />
      </div>

      <div className="attractions-cards-container">
        {loading ? (
            <h2 style={{color: 'white', textAlign: 'center'}}>Loading...</h2>
        ) : attractionsList.length > 0 ? (
          attractionsList.map((item) => (
            <AttractionCard
              // ⚠️ ربط البيانات بدقة بناءً على الـ JSON الذي أرسلته لي
              key={item.attrac_id}
              id={item.attrac_id}
              
              // ملاحظة: الصور في قاعدة البيانات حالياً هي روابط وهمية (example.com)
              // لذلك ستظهر مكسورة حتى تضع روابط حقيقية في قاعدة البيانات
              image={item.attrac_img_url} 
              
              name={item.name}
              type={item.category}
              entryFee={item.price}
              rating={item.rating}
              location={item.location}
            />
          ))
        ) : (
          <div style={{ color: "white", textAlign: "center", width: "100%", padding: "20px" }}>
            {hasSearched ? (
              <h2>No attractions found matching your search.</h2>
            ) : (
              <h2>Please use the search box above.</h2>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Attractions;
import React, { useState } from "react";
import "./css/AttractionForm.css";

const AttractionForm = () => {
  // -------------------- STATE VARIABLES -------------------- //
  const [attractionName, setAttractionName] = useState("");
  const [city, setCity] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [people, setPeople] = useState("");
  const [category, setCategory] = useState("");

  // -------------------- ERROR STATES -------------------- //
  const [errors, setErrors] = useState({});

  // -------------------- VALIDATION FUNCTION -------------------- //
  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!city.trim()) newErrors.city = "City is required";

    if (!visitDate) newErrors.visitDate = "Visit date is required";
    else if (new Date(visitDate) < today)
      newErrors.visitDate = "Visit date must be in the future";

    if (!people) newErrors.people = "Number of people is required";
    else if (Number(people) < 1) newErrors.people = "At least 1 person";

    if (!category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------- SUBMIT HANDLER -------------------- //
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log({
        attractionName,
        city,
        visitDate,
        people,
        category,
      });

      // Optional reset
      setAttractionName("");
      setCity("");
      setVisitDate("");
      setPeople("");
      setCategory("");
      setErrors({});
    }
  };

  return (
    <form className="attraction-form-container" onSubmit={handleSubmit}>

      {/* Attraction Name */}
      <div className="attraction-form-group">
        <input
          id="Attraction Name"
          name="Attraction Name"
          type="text"
          placeholder="Attraction Name"
          value={attractionName}
          onChange={(e) => setAttractionName(e.target.value)}
        />
      </div>
      {errors.attractionName && (
        <span className="attraction-error">{errors.attractionName}</span>
      )}

      {/* City */}
      <div className="attraction-form-group">
        <input
          name="City"
          id="City"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {errors.city && <span className="attraction-error">{errors.city}</span>}

      

      {/* Category */}
      <div className="attraction-form-group">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="museum">Museum</option>
          <option value="park">Park</option>
          <option value="historic">Historic Site</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>
      {errors.category && (
        <span className="attraction-error">{errors.category}</span>
      )}
      
      <button type="submit">Search</button>
    </form>
  );
};

export default AttractionForm;

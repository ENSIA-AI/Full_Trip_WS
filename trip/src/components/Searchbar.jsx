import './css/Searcharea.css';
import React, { useState } from 'react';

function Searcharea() {
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    place: "",
    checkin: today,
    checkout: today,
    adults: "",
    children: "",
    pets: "",
    budget: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function validate() {
    let newErrors = {};

    if (!form.place || form.place.trim().length < 3) {
      newErrors.place = "Please enter a valid city or hotel name.";
    }

    if (!form.checkin) {
      newErrors.checkin = "Check-in date is required.";
    }

    if (!form.checkout) {
      newErrors.checkout = "Check-out date is required.";
    } else if (form.checkout < form.checkin) {
      newErrors.checkout = "Check-out must be after check-in.";
    }

    if (!form.adults || Number(form.adults) < 1) {
      newErrors.adults = "At least 1 adult is required.";
    }

    if (form.children < 0) {
      newErrors.children = "Children cannot be negative.";
    }

    if (form.pets < 0) {
      newErrors.pets = "Pets cannot be negative.";
    }

    if (form.budget < 0) {
      newErrors.budget = "Budget cannot be negative.";
    }

    return newErrors;
  }

  function handleSubmit() {
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      alert("Form is valid ✔️");
    }
  }

  return (
    <>
      <div className='inforamtions'>

        <input 
          type="text" 
          id="place" 
          placeholder="City Or Hotle name"
          value={form.place}
          onChange={handleChange}
        />
        {errors.place && <p className="error">{errors.place}</p>}

        <form>
          <input 
            type="date" 
            id="checkin" 
            value={form.checkin}
            onChange={handleChange}
          />
        </form>
        {errors.checkin && <p className="error">{errors.checkin}</p>}

        <form>
          <input 
            type="date" 
            id="checkout" 
            value={form.checkout}
            onChange={handleChange}
          />
        </form>
        {errors.checkout && <p className="error">{errors.checkout}</p>}

        <form className="persons">
          <input 
            type="number" 
            id="adults" 
            placeholder="Adults"
            value={form.adults}
            min="1"
            onChange={handleChange}
          />
          <input 
            type="number" 
            id="children" 
            placeholder="Children"
            min="0"
            value={form.children}
            onChange={handleChange}
          />
          <input 
            type="number" 
            id="pets" 
            placeholder="Pets"
            min="0"
            value={form.pets}
            onChange={handleChange}
          />
        </form>

        {errors.adults && <p className="error">{errors.adults}</p>}
        {errors.children && <p className="error">{errors.children}</p>}
        {errors.pets && <p className="error">{errors.pets}</p>}

        <input 
          type="number" 
          id="budget" 
          placeholder="Enter your budget"
          value={form.budget}
          min="0"
          onChange={handleChange}
        />
        {errors.budget && <p className="error">{errors.budget}</p>}

        <button id="Search" className="form" onClick={handleSubmit}>
          Search
        </button>

      </div>
    </>
  );
}

export default Searcharea;

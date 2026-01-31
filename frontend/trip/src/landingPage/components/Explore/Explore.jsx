import '../../styles/explStiling.css'
import { useState, useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import CityAutocomplete from './cityAutoComplete'

export default function Explore() {
  const [date, setDate] = useState('');
  let [images, setImages] = useState(['TouristPlace/tourist-Place1.jpg', 'TouristPlace/tourist-Place2.jpg', 'TouristPlace/tourist-Place3.jpg', 'TouristPlace/tourist-Place4.jpg', 'TouristPlace/tourist-Place5.jpg', 'TouristPlace/tourist-Place6.jpg', 'TouristPlace/tourist-Place7.jpeg', 'TouristPlace/tourist-Place8.jpg'])

  let image = images.map((img) => (
    <img data-aos='fade-up' src={img} key={img} />
  ))

  let [active, setActive] = useState('All');
  const catigories = ['All', 'Recommended', 'Beach', 'Park', 'Nature', 'Mountain']

  const Catigories = catigories.map((cat) => (
    <button
      key={cat}
      onClick={() => setActive(cat)}
      className={active === cat ? 'active' : ''}
    >
      {cat}</button>
  ))

  const [location, setLocation] = useState(false);
  const [resetForm, setResetForm] = useState(false);
  const [cityValid, setCityValid] = useState(false);

  function onsubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const locationValue = formData.get('location');
    if (!cityValid) {
      alert('Please select a valid city from the list');
      return;
    }
    if (locationValue !== '') {
      setLocation(true);
    }
    setDate('');
    setPrice('');
    setResetForm(true);
    // Reset the flag after clearing
    setTimeout(() => setResetForm(false), 0);
  }

  const [price, setPrice] = useState('');

  const formatPrice = (value) => {
    const numbers = value.replace(/\D/g, '');

    const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formatted ? formatted + '$' : '';
  };

  const handleChange = (e) => {
    const formatted = formatPrice(e.target.value);
    setPrice(formatted);
  };

  useEffect(() => {
    Aos.init({ duration: 1700 })
  }, [])

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className='explore-page'>
      <p data-aos='fade-up'>EXPLORE NOW</p>
      <h1 data-aos='fade-up'>Find Your Dream Destination</h1>
      <small data-aos='fade-up'>Fill in the fields below to find the best spot for your next tour</small>
      <form className='tr-form' onSubmit={onsubmit}>

        <label className='kra' data-aos='fade-up'>
          {location ? (<i class='bxr  bx-location-check'  ></i>)
            : (<i class='bxr  bx-location'  ></i>)}
          <CityAutocomplete onAppearChange reset={resetForm} onValidationChange={setCityValid} />
        </label>
        <label className='kra' data-aos='fade-up'>
          <i class='bxr  bx-calendar-minus'  ></i>
          <input
            className='kr'
            type='text'
            value={price}
            onChange={handleChange}
            placeholder='budget'
            required
          />
        </label>
        <label className='kra' data-aos='fade-up'>
          <i class='bxr  bx-calendar-minus'  ></i>
          <input
            className='kr'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={today}
            placeholder='Date'
            required>
          </input>
        </label>
        <button data-aos='fade-left'><i class='bxr  bx-search'  ></i> Search</button>
      </form>
      <nav data-aos='zoom-out'>
        {Catigories}
      </nav>
      <div className='exp-images'>
        {image}
      </div>
    </div>
  )
}

import '../styles/explStiling.css'
import { useState, useEffect } from 'react'
import tripImg from '../images/place1.jpg'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Explore() {
  let [active, setActive] = useState('All');
  const catigories = ['All', 'Recommended', 'Beach', 'Park', 'Nature', 'Mountain']

  const [location, setLocation] = useState(false);
  function onsubmit(dataform) {
    const location = dataform.get('location');
    if (location !== '') {
      setLocation(true);
    }
  }

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <div className='explore-page'>
      <p data-aos='fade-up'>EXPLORE NOW</p>
      <h1 data-aos='fade-up'>Find Your Dream Destination</h1>
      <small data-aos='fade-up'>Fill in the fields below to find the best spot for your next tour</small>
      <form className='trip-form' action={onsubmit}>
        <label data-aos='fade-up'>
          {location ? (<i class='bxr  bx-location-check'  ></i>) : (<i class='bxr  bx-location'  ></i>)}<input name='location' type='text' placeholder='Location'></input>
        </label>
        <label data-aos='fade-up'>
          <i class='bxr  bx-wallet-note'  ></i><input type='number' placeholder='Budget'></input>
        </label>
        <label data-aos='fade-up'>
          <i class='bxr  bx-calendar-minus'  ></i><input type='date' placeholder='Date'></input>
        </label>
        <button data-aos='fade-left'><i class='bxr  bx-search'  ></i> Search</button>
      </form>
      <nav>
        {catigories.map((cat) => (
          <button
            data-aos='zoom-in'
            key={cat}
            onClick={() => setActive(cat)}
            className={active === cat ? 'active' : ''}
          >
            {cat}</button>
        ))}

      </nav>
      <div className='images'>
        <img data-aos ='fade-up' src={tripImg} />
        <img data-aos ='fade-up' src={tripImg} />
        <img data-aos ='fade-up' src={tripImg} />
        <img data-aos ='fade-up' src={tripImg} />
      </div>
    </div>
  )
}

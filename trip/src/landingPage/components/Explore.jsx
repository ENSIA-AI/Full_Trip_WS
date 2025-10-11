import '../styles/explStiling.css'
import { useState } from 'react'
import tripImg from '../images/place1.jpg'

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
  return (
    <div className='explore-page'>
      <p>EXPLORE NOW</p>
      <h1>Find Your Dream Destination</h1>
      <small>Fill in the fields below to find the best spot for your next tour</small>
      <form className='trip-form' action={onsubmit}>
        <label>
          {location ? (<i class='bxr  bx-location-check'  ></i>) : (<i class='bxr  bx-location'  ></i>)}<input name='location' type='text' placeholder='Location'></input>
        </label>
        <label>
          <i class='bxr  bx-wallet-note'  ></i><input type='number' placeholder='Budget'></input>
        </label>
        <label>
          <i class='bxr  bx-calendar-minus'  ></i><input type='date' placeholder='Date'></input>
        </label>
        <button><i class='bxr  bx-search'  ></i> Search</button>
      </form>
      <nav>
        {catigories.map((cat)=>(
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={active === cat ? 'active' : ''}
        >
          {cat}</button>
        ))}

      </nav>
      <div className='images'>
        <img src={tripImg} />
        <img src={tripImg} />
        <img src={tripImg} />
        <img src={tripImg} />
      </div>
    </div>
  )
}

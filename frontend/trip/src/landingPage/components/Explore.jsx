import '../styles/explStiling.css'
import { useState, useEffect} from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Explore() {
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
  function onsubmit(dataform) {
    const location = dataform.get('location');
    if (location !== '') {
      setLocation(true);
    }
  }

  useEffect(() => {
    Aos.init({ duration: 1700 })
  }, [])

  return (
    <div className='explore-page'>
      <p data-aos='fade-up'>EXPLORE NOW</p>
      <h1 data-aos='fade-up'>Find Your Dream Destination</h1>
      <small data-aos='fade-up'>Fill in the fields below to find the best spot for your next tour</small>
      <form className='tr-form' action={onsubmit}>
        <label className='kra' data-aos='fade-up'>
          {location ? (<i class='bxr  bx-location-check'  ></i>) : (<i class='bxr  bx-location'  ></i>)}<input   className='kr' id='LocInp' name='location' type='text' placeholder='Location'></input>
        </label>
        <label className='kra' data-aos='fade-up'>
          <i class='bxr  bx-wallet-note'  ></i><input className='kr' type='number' placeholder='Budget'></input>
        </label>
        <label className='kra' data-aos='fade-up'>
          <i class='bxr  bx-calendar-minus'  ></i><input className='kr' type='date' placeholder='Date'></input>
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

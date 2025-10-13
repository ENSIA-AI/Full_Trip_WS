import '../styles/homeStyle.css'
import tripImg from '../images/place1.jpg'
import { useEffect } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Home() {
  const scrollToTripForm = () => {
    const explorePage = document.querySelector('.explore-page')
    if (explorePage) {
      explorePage.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <>
      <div className='main-page'>
        <p data-aos='fade-down'>Unlock Your Travel Dreams With Us!</p>
        <p data-aos='fade-left'>Discover the world most adventurus places ,life is so short for a trip.</p>
        <button data-aos='zoom-in' onClick={scrollToTripForm}>GET STARTED <i class='bxr  bx-arrow-right'  ></i> </button>
        <div className='popular-places-tit'>
          <span data-aos='fade-right'>Popular places</span><hr data-aos='fade-right' />
        </div>
        <div className='images'>
          <img data-aos='fade-up' src={tripImg} />
          <img data-aos='fade-up' src={tripImg} />
          <img data-aos='fade-up' src={tripImg} />
          <img data-aos='fade-up' src={tripImg} />
        </div>
      </div>
      <ul className="review">
        <li data-aos='zoom-in'>
          <h1 data-aos='fade-right'>10</h1>
          <small data-aos='fade-left'>World Of Experiences</small>
        </li>
        <li data-aos='zoom-in'>
          <h1 data-aos='fade-right'>4K+</h1>
          <small data-aos='fade-left'>Fine Destination</small>
        </li>
        <li data-aos='zoom-in'>
          <h1 data-aos='fade-right'>10K+</h1>
          <small data-aos='fade-left'>Customer Reviews</small>
        </li>
        <li data-aos='zoom-in'>
          <h1 data-aos='fade-right'>5.6</h1>
          <small data-aos='fade-left'>Overall Rating</small>
        </li>
      </ul>
    </>
  )
}
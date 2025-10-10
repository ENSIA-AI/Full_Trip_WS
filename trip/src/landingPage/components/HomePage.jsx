import '../styles/homeStyle.css'
import tripImg from '../images/place1.jpg'
export default function Home() {
  return (
    <div className='main-page'>
      <p>Unlock Your Travel Dreams With Us!</p>
      <p>Discover the world most adventurus places ,life is so short for a trip.</p>
      <button>GET STARTED <i class='bxr  bx-arrow-right'  ></i> </button>
      <div className='popular-places-tit'>
        <span>Popular places</span><hr />
      </div>
      <div className='images'>
        <img src={tripImg} />
        <img src={tripImg} />
        <img src={tripImg} />
        <img src={tripImg} />
      </div>
    </div>
  )
}
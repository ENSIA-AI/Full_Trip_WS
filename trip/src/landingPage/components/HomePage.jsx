import '../styles/homeStyle.css'
import tripImg from '../images/place1.jpg'
export default function Home() {
  let [images, setImages] = useState(['TouristPlace/tourist-Place1.jpg', 'TouristPlace/tourist-Place2.jpg', 'TouristPlace/tourist-Place3.jpg', 'TouristPlace/tourist-Place4.jpg'])
  let image = images.map((img) => (
    <img data-aos='fade-up' src={img} key={img} />
  ))
  const scrollToTripForm = () => {
    const explorePage = document.querySelector('.explore-page')
    if (explorePage) {
      explorePage.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return (
    <>
      <div>
        <p>Discover the world most adventurus places ,life is so short for a trip.</p>
        <button onClick={scrollToTripForm}>GET STARTED <i class='bxr  bx-arrow-right'  ></i> </button>
        <div className='popular-places-tit'>
          <span>Popular places</span><hr />
        </div>
        <div className='images'>
          <img src={tripImg} />
          <img src={tripImg} />
          <img src={tripImg} />
          <img src={tripImg} />
        </div>
      </div >
      <ul className="review">
        <li>
          <h1>10</h1>
          <small>World Of Experiences</small>
        </li>
        <li>
          <h1>4K+</h1>
          <small>Fine Destination</small>
        </li>
        <li>
          <h1>10K+</h1>
          <small>Customer Reviews</small>
        </li>
        <li>
          <h1>5.6</h1>
          <small>Overall Rating</small>
        </li>
      </ul>
    </>
  )
}
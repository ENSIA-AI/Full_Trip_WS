import Navbar from "../components/Navbar";
import Searcharea from "../components/Searchbar";
import Hotelcard from "../components/Hotelcard";
import top1 from './pics/top1.jpg'
import top2 from './pics/top2.avif'
import top3 from './pics/top3.jpg'
import top4 from './pics/top4.jpg'
import top5 from './pics/top5.jpg'
import top6 from './pics/top6.jpg'
import top7 from './pics/top7.jpg'
import top8 from './pics/top8.jpg'
import top9 from './pics/top9.jpg'
import top10 from './pics/top10.jpg'
import hotel from './pics/hotel.png'
import Footer2 from"../components/Footer2"


import './css/page.css'
function Hotels() {

    const slider = document.querySelector('.slider');
    let scrollAmount = 0;

    setInterval(() => {
        const slideWidth = slider.clientWidth;
        scrollAmount += slideWidth;

        if (scrollAmount >= slider.scrollWidth) {
            scrollAmount = 0;
        }

        slider.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, 3000);


    return (<>

        <Navbar></Navbar>
        <h1 className="header"> <img src={hotel} className="icon" /> Reserve Your Spot </h1>

        <section className="container">
            <div className="slider-wrapper">
                <div className="slider">
                    <div className="slide">
                        <img id="slide-1" src={top1} alt="top1" />
                        <div className="pic-overlay">
                            <h2>1. Capella Bangkok (Bangkok, Thailand)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-2" src={top2} alt="top2" />
                        <div className="pic-overlay">
                            <h2>2. Passalacqua (Lake Como, Italy)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-3" src={top3} alt="top3" />
                        <div className="pic-overlay">
                            <h2>3. Rosewood Hong Kong (Hong Kong)</h2>
                        </div>
                    </div>



                    <div className="slide">
                        <img id="slide-4" src={top4} alt="top4" />
                        <div className="pic-overlay">
                            <h2>4. Cheval Blanc Paris (Paris, France)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-5" src={top5} alt="top5" />
                        <div className="pic-overlay">
                            <h2>5. The Upper House (Hong Kong)</h2>
                        </div>
                    </div>


                    <div className="slide">
                        <img id="slide-6" src={top6} alt="top6" />
                        <div className="pic-overlay">
                            <h2>6. Raffles Singapore (Singapore)</h2>
                        </div>
                    </div>



                    <div className="slide">
                        <img id="slide-7" src={top7} alt="top7" />
                        <div className="pic-overlay">
                            <h2>7. Aman Tokyo (Tokyo, Japan)</h2>
                        </div>
                    </div>
                    <div className="slide">
                        <img id="slide-8" src={top8} alt="top8" />
                        <div className="pic-overlay">
                            <h2>8. Soneva Fushi (Maldives)</h2>
                        </div>
                    </div>

                    <div className="slide">
                        <img id="slide-9" src={top9} alt="top9" />
                        <div className="pic-overlay">
                            <h2>9. Atlantis The Royal (Dubai, UAE)</h2>
                        </div>
                    </div>

                    <div className="slide">
                        <img id="slide-10" src={top10} alt="top10" />
                        <div className="pic-overlay">
                            <h2>10. Nihi Sumba (Sumba Island, Indonesia)</h2>
                        </div>
                    </div>
                    <div className="slider-nav">
                        <a href="#slide-1"></a>
                        <a href="#slide-2"></a>
                        <a href="#slide-3"></a>
                        <a href="#slide-4"></a>
                        <a href="#slide-5"></a>
                        <a href="#slide-6"></a>
                        <a href="#slide-7"></a>
                        <a href="#slide-8"></a>
                        <a href="#slide-9"></a>
                        <a href="#slide-10"></a>
                    </div>
                </div>
            </div>
        </section>

        <div className="output">
            <div className="search">
                <Searcharea></Searcharea>
            </div>
            <div className="outputarea">
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
            </div>
        </div>
      <Footer2></Footer2>
    </>);

}


export default Hotels;
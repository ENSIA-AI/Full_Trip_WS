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

import './css/page.css'
function Hotels() {
    return (<>

        <Navbar></Navbar>
        <div className="top-hotels">
            <h1>World TOP 10 HOTELS</h1>
            <section className="container">
                <div className="slider-wrapper">
                    <div className="slider">
                        <img id="slide-1" src={top1} alt="top1" />
                        <img id="slide-2" src={top2} alt="top2" />
                        <img id="slide-3" src={top3} alt="top3" />
                        <img id="slide-4" src={top4} alt="top4" />
                        <img id="slide-5" src={top5} alt="top5" />
                        <img id="slide-6" src={top6} alt="top6" />
                        <img id="slide-7" src={top7} alt="top7" />
                        <img id="slide-8" src={top8} alt="top8" />
                        <img id="slide-9" src={top9} alt="top9" />
                        <img id="slide-10" src={top10} alt="top10" />
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
            </section>
        </div>
        <div className="output">
            <Searcharea></Searcharea>
            <div className="outputarea">
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
                <Hotelcard></Hotelcard>
            </div>
        </div>

    </>);

}


export default Hotels;
import { faStar, faMapLocation, faWifi, faParking, faCoffee, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Styles/Hotels.css'

const MaxRating = 5;
const HotelInfo_1 = {

    name: "The Grand Plaza Hotel",
    location: "Manhattan, New York",
    rating: 9.2,
    stars: 4,
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc2MjM5NjYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: [{
        name: "Free-Wifi",
        icon: faWifi
    }, {
        name: "Parking",
        icon: faParking
    }, {
        name: "Breakfast",
        icon: faCoffee
    }, {
        name: "Gym",
        icon: faDumbbell
    }],
    price: 299,
    NightsReserved: 3,
    Status: "Active",
    description: "Luxurious 5-star hotel in the heart of Manhattan with stunning city views, world-class dining, and exceptional service.",

    date_in: "02 / 05 / 2025",
    date_out: "05 / 05 / 2025"

}


function HotelCard({ HotelInfo }) {




    return (<>
        <div className="Section" style={{ backgroundColor: "white" }}>
            <div className="Hotel">

                <img src={HotelInfo.imageUrl}></img>

                <div className="HotelDetails">



                    <div className="CardHeader">
                        <div>
                            <h3>{HotelInfo.name}</h3>
                            <div className="stars">
                                {[...Array(HotelInfo.stars)].map((_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar}></FontAwesomeIcon>
                                ))}
                                <span>
                                    {[...Array(MaxRating - HotelInfo.stars)].map((_, i) => (
                                        <FontAwesomeIcon key={i} icon={faStar}></FontAwesomeIcon>
                                    ))}
                                </span>
                            </div>
                        </div>
                        <div className="Rating">
                            {HotelInfo.rating}
                        </div>
                    </div>

                    <div className="Location">

                        <FontAwesomeIcon icon={faMapLocation}></FontAwesomeIcon>
                        <p>{HotelInfo.location}</p>

                    </div>

                    <p> {HotelInfo.description}</p>





                    <div className="Amenities">
                        {HotelInfo.amenities.map((amenitie, index) => (

                            <div className="Amenitie" key={index}>
                                <FontAwesomeIcon icon={amenitie.icon}></FontAwesomeIcon>
                                <p>{amenitie.name}</p>
                            </div>
                        ))}
                    </div>




                    <p className="Price"><span>{HotelInfo.price}$</span> / night</p>
                    <div className="Res_info">
                        <div className="NightsRes">
                            <h4>Nights Reserved:</h4>
                            <p>{HotelInfo.NightsReserved}</p>
                        </div>
                        <div className="HStatus">
                            <h4> Status: </h4>
                            <div className={HotelInfo.Status}>{HotelInfo.Status}</div>
                        </div>
                        <div className="DateIn">
                            <h4> From: </h4>
                            <p>{HotelInfo.date_in}</p>
                        </div>
                        <div className="DateOut">
                            <h4> To: </h4>
                            <p>{HotelInfo.date_out}</p>
                        </div>
                    </div>

                </div>




            </div>
            <button className="SecondaryB RemoveCard" style={{ float: "right" }}>Cancel Reservation</button>

        </div>


    </>)



}


function Hotels() {

    return (<>
        <div className="S_Container Section">
            <div className="SecHeader" >
                <h1>My Hotel Reservation</h1>
                <p>Manage your Current Hotel Reservation</p>
            </div>
            <HotelCard HotelInfo={HotelInfo_1}></HotelCard>
            <HotelCard HotelInfo={HotelInfo_1}></HotelCard>
            <HotelCard HotelInfo={HotelInfo_1}></HotelCard>

        </div>
    </>)
}

export default Hotels;


import { faPlaneDeparture, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Styles/Flights.css'


const FlightInfo_1 = {

    Airline: "Emirates Airlines",
    AirPlane_Id: "E2-460",

    DepartContry: "Emirates",
    DepartAirport: "Dubai Airport",
    DepartDate: "02 November 2025",
    DepartTime: "8:00 AM",

    DestinationCountry: "UK",
    DestinationAirport: "London Airport",
    ArrivalDate: "03 Novermber 2025",
    ArrivalTime: "2:00 PM",

    Duration: "6h30m",
    Stops: 0,

    Class: "Economy",
    Price: "200$",
    Status: "Active",

}

const FlightInfo_2 = {

    Airline: "Emirates Airlines",
    AirPlane_Id: "E2-460",

    DepartContry: "Emirates",
    DepartAirport: "Dubai Airport",
    DepartDate: "02 November 2025",
    DepartTime: "8:00 AM",

    DestinationCountry: "UK",
    DestinationAirport: "London Airport",
    ArrivalDate: "03 Novermber 2025",
    ArrivalTime: "2:00 PM",

    Duration: "6h30m",
    Stops: 0,

    Class: "Business",
    Price: "200$",
    Status: "Pending",

}


function FlightCard({ FlightInfo }) {

    return (<>

        <div className=" Flights Section" style={{ backgroundColor: "white" }} >
            <h3 style={{ borderBottom: "2px solid black", paddingBottom: "10px" }}>{FlightInfo.DepartDate} - {FlightInfo.ArrivalDate}</h3>

            <div className="FlightCard">

                <div className="Icon_Flight_Details">

                    <FontAwesomeIcon icon={faPlaneDeparture} className="FlightIcon" />

                    <div className="Airline">
                        <h3>{FlightInfo.Airline}</h3>
                        <p>{FlightInfo.AirPlane_Id}</p>
                    </div>
                </div>


                <div className="FlightTimeDescription">

                    <div className="Location_Description">
                        <div>
                            <h4> {FlightInfo.DepartContry}</h4>
                            <p className="Airport">{FlightInfo.DepartAirport}</p>
                        </div>
                        <p>{FlightInfo.DepartTime}</p>
                    </div>


                    <div className="Location_Description">

                        <div className="Duration">
                            <FontAwesomeIcon icon={faClock} className="Icon"></FontAwesomeIcon>
                            <p>{FlightInfo.Duration}</p>
                        </div>
                        <hr></hr>

                        <div className="Stops">{FlightInfo.Stops === 0 ? "Non-Stop" : FlightInfo.Stops == 1 ? "1 Stop" : FlightInfo.Stops + " Stops"} </div>

                    </div>


                    <hr></hr>
                    <div className="FullCircle1" ></div>
                    <div className="EmptyCircle"></div>
                    <div className="FullCircle2"></div>




                    <div className="Location_Description">
                        <div>
                            <h4>{FlightInfo.DestinationCountry}</h4>
                            <p className="Airport">{FlightInfo.DestinationAirport}</p>
                        </div>
                        <p>{FlightInfo.ArrivalTime}</p>
                    </div>
                </div>
                <div className="FlightResInfo FlexH_spaceBetween">

                    <div className="Price">
                        <h3>Price</h3>
                        <p>{FlightInfo.Price}</p>
                    </div>
                    <div className=" Class">
                        <h3>Class</h3>
                        <div className={FlightInfo.Class}>{FlightInfo.Class}</div>

                    </div>

                    <div className="Status">
                        <h3> Status</h3>
                        <div className={FlightInfo.Status}>{FlightInfo.Status}</div>
                    </div>

                </div>
            </div>

            <button className="SecondaryB RemoveCard" style={{ flexShrink: "1" }}>Cancel Flight</button>

        </div>
    </>)


}

function Flights() {


    return (<>
        <div className="S_Container Section">
            <div className="SecHeader" >
                <h1>My Flights</h1>
                <p>Manage your Current Flights</p>
            </div>
            <FlightCard FlightInfo={FlightInfo_1} />
            <FlightCard FlightInfo={FlightInfo_2} />

        </div>
    </>)
}

export default Flights;
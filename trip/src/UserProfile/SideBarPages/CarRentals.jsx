
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BMW from './Images/bmw.svg'
import MERC from './Images/Merc.svg'



import { faUser, faA, faM, faBolt, faGasPump, faClock, faMapLocation } from '@fortawesome/free-solid-svg-icons'
import './Styles/CarRentals.css'
const Car_1 = {

    Type: "SUV",
    Brand: "BMW",
    Model: "5 Series",
    Transmition: "Automatic",
    FuelType: "Electric",

    Image: BMW,

    Passengers: 5,

    PickUpLocation: "New York",
    PickupDate: "05 / 05 / 2025",

    ReturnDate: "02 / 05 / 2025",
    ReturnLocation: "New York",

    Price: 80,
    DaysRented: 2,
    Total: 160,

    Status: "Active"

}
const Car_2 = {

    Type: "Lexury",
    Brand: "Mercedes",
    Model: "Benz",
    Transmition: "manual",
    FuelType: "Disel",

    Image: MERC,

    Passengers: 3,

    PickUpLocation: "New York",
    PickupDate: "05 / 05 / 2025",

    ReturnDate: "02 / 05 / 2025",
    ReturnLocation: "New York",

    Price: 80,
    DaysRented: 2,
    Total: 160,

    Status: "Pending"

}

function CarCard({ Car }) {

    return <>
        <div className="Section" style={{ backgroundColor: "white" }}>
            <div className='Car'>
                <img src={Car.Image}></img>
                <div className='CarDetails'>

                    <div className='CarType'>
                        {Car.Type}
                    </div>

                    <h2>{`${Car.Brand} ${Car.Model}`}</h2>

                    <div className='Amenities'>
                        <div className='Amenitie'> <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{`${Car.Passengers} Passenger${(Car.Passengers > 1) ? "s" : ""}`}</div>
                        <div className='Amenitie'> <FontAwesomeIcon icon={(Car.Transmition === "Automatic") ? faA : faM}></FontAwesomeIcon>{Car.Transmition}</div>
                        <div className='Amenitie'><FontAwesomeIcon icon={(Car.FuelType === "Electric" ? faBolt : faGasPump)}></FontAwesomeIcon>{Car.FuelType}</div>
                    </div>

                    <p className='Price'>Price/Day: <span>{Car.Price}$</span></p>
                    <p className='Price'> Total: <span>{Car.Total}$</span> </p>




                    <div className='Res_info'>
                        <div className="NightsRes">
                            <h4>Days Rented:</h4>
                            <p>{Car.DaysRented}</p>
                        </div>
                        <div className="HStatus">
                            <h4> Status: </h4>
                            <div className={Car.Status}>{Car.Status}</div>
                        </div>
                        <div className="DateIn">
                            <h4> Pick up: </h4>

                            <p><FontAwesomeIcon icon={faClock} className='Icon'></FontAwesomeIcon> {Car.PickupDate}</p>
                            <p><FontAwesomeIcon icon={faMapLocation} className='Icon'> </FontAwesomeIcon> {Car.PickUpLocation}</p>
                        </div>
                        <div className="DateOut">
                            <h4> Return: </h4>
                            <p> <FontAwesomeIcon icon={faClock} className='Icon'></FontAwesomeIcon> {Car.ReturnDate}</p>
                            <p><FontAwesomeIcon icon={faMapLocation} className='Icon'> </FontAwesomeIcon> {Car.ReturnLocation}</p>
                        </div>

                    </div>

                </div>

            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="SecondaryB RemoveCard" sty>Cancel Reservation</button>
            </div>

        </div>
    </>


}

function CarRentals() {

    return (<>
        <div className="S_Container Section">
            <div className="SecHeader" >
                <h1>My Car Reservation</h1>
                <p>Manage your Car Rentals</p>
            </div>
            <CarCard Car={Car_1}></CarCard>
            <CarCard Car={Car_2}></CarCard>
        </div>
    </>)
}
export default CarRentals
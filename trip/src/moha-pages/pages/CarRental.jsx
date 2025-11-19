import CarRentalCard from "../components/CarRentalCard";
import './css/CarRental.css'
import carImg from "../img/Car.webp";
import { BrowserRouter, Route, Router } from "react-router-dom";
import CarRentalForm from "../components/CarRentalForm";



function CarRental() {
    return (
        <div className="carrentalcard-container">
            <CarRentalForm></CarRentalForm>
            <div className="car-form-cont">
                <CarRentalCard
                    id={1}
                    image={carImg}
                    name="Audi A4"
                    model="2023"
                    price="15000"
                    location="Algiers"
                />

                <CarRentalCard
                    id={2}
                    image={carImg}
                    name="BMW M3"
                    model="2022"
                    price="18000"
                    location="Oran"
                />

                <CarRentalCard
                    id={3}
                    image={carImg}
                    name="Golf 7"
                    model="2020"
                    price="9000"
                    location="Constantine"
                />
            </div>
        </div>
    );
}

export default CarRental;

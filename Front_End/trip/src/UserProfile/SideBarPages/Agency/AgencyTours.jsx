import { faN, faCompass, faPlus, faSave, faD, faPen, faClock, faDollar, faUpload, faCamera, faPlane, faPlaneUp, faC, faBed, faUtensils, faCalendar, faUser, faEllipsisV, faCaretDown, faEye, faTrashCan, faUsers, faX, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Routes, Route, Navigate, Form } from "react-router-dom";

import './styles/AgencyTours.css'
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";

import { createPortal } from 'react-dom';

const today = new Date().toISOString().split("T")[0];

function AddTour() {

    //Form Vlidations:
    const tourNameIn = useRef();
    const destinationIn = useRef();
    const descriptionIn = useRef();
    const durationIn = useRef();
    const amountIn = useRef();


    const [formData, setFormData] = useState({
        tourName: "",
        destination: "",
        description: "",
        duration: "",
        amount: ""

    })
    const [errors, setErrors] = useState({});
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));//resets errors

        e.target.classList.remove("InvalidIn");
    }
    function validate(values) {
        const newErrors = {};

        // Tour name
        if (!values.tourName.trim()) {
            newErrors.tourName = "Tour name is required.";
            tourNameIn.current.classList.add("InvalidIn");
        } else if (values.tourName.trim().length < 3) {
            newErrors.tourName = "Tour name must be at least 3 characters.";
            tourNameIn.current.classList.add("InvalidIn");

        }

        // Destination
        if (!values.destination.trim()) {
            newErrors.destination = "Destination is required.";
            destinationIn.current.classList.add("InvalidIn");

        }

        // Description
        if (!values.description.trim()) {
            newErrors.description = "Description is required.";
            descriptionIn.current.classList.add("InvalidIn");

        } else if (values.description.trim().length < 10) {
            newErrors.description = "Description must be at least 10 characters.";
            descriptionIn.current.classList.add("InvalidIn");

        }

        // Duration
        if (!values.duration.toString().trim()) {
            newErrors.duration = "Duration is required.";
            durationIn.current.classList.add("InvalidIn");
        }
        //Pricing
        if (!values.amount.toString().trim()) {
            newErrors.amount = "Amount is required";
            amountIn.current.classList.add("InvalidIn");
        }
        // Departure Dates
        if (DDates.length === 0) {
            newErrors.date = "At least one departure date is required.";
        }

        return newErrors;
    }


    function HandleSubmit(e) {

        e.preventDefault();

        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

    }
    function handleReset() {
        setFormData(
            {
                tourName: "",
                destination: "",
                description: "",
                duration: "",
                highlight: ""
            }
        )
        tourNameIn.current.classList.remove("InvalidIn");
        destinationIn.current.classList.remove("InvalidIn");
        descriptionIn.current.classList.remove("InvalidIn");
        durationIn.current.classList.remove("InvalidIn");
        amountIn.current.classList.remove("InvalidIn");
        setErrors({});

    }



    const [HighlightsCount, SetHighlightsCount] = useState(1);
    const [HighlightsIDCount, SetHighlightsIDCount] = useState(1);
    const [Highlights, SetHighlights] = useState([{ id: 0 }]);

    //Dates Management:
    const [DDates, setDDates] = useState([]);
    const [IdCount, setIdCount] = useState(0);

    const [DateValid, SetDateValid] = useState(true);
    const [SpotsValid, SetSpotsValid] = useState(true);

    const Dateinput = useRef();
    const Spotsinput = useRef();
    function AddDepartureDate() {
        const date = Dateinput.current.value.trim();
        const spots = Spotsinput.current.value.trim();
        var Valid = true;
        if (date === "") {

            SetDateValid(false);
            Valid = false;

        }
        else {
            SetDateValid(true);
        }
        if (spots === "") {
            SetSpotsValid(false);
            Valid = false;
        }
        else {
            SetSpotsValid(true);

        }
        if (Valid) {
            setDDates(prev => [...prev, { Date: date, Spots: spots, id: IdCount, SpotsTaken: 0 }]);
            setIdCount(IdCount + 1);
        }
    }
    function DeleteDate(id) {

        setDDates(prev => prev.filter(Date => Date.id !== id));
    }
    //--------------------------------------------

    function AddHighlight() {

        SetHighlightsCount(HighlightsCount + 1);
        SetHighlights(prev => [...prev, { id: HighlightsIDCount }]);
        SetHighlightsIDCount(HighlightsIDCount + 1);

    }
    function RemoveHighlight(idToRemove) {

        SetHighlights(prev => prev.filter(i => i.id !== idToRemove));
        SetHighlightsCount(HighlightsCount - 1);

    }




    return (<>
        <div className="Section">
            <form onSubmit={HandleSubmit} onReset={handleReset} className="FlexV">


                <div className="SecHeader FlexH_spaceBetween">
                    <div>
                        <h3>Publish New Tour Package</h3>
                        <p>Create and publish a new tour package for your travel agency</p>
                    </div>
                    <input type="reset" className="SecondaryB"></input>
                    <input type="submit" className="PrimaryB" value="Publish"></input    >
                </div>
                <div className="parent">
                    <div className="div1 Section">
                        <div className="SecHeader">

                            <h3> Tour Inforamtion:</h3>
                        </div>
                        <div className="TourInfoForm FlexV">
                            <div className="InputContainer">
                                <label>Tour Name:</label>
                                <div>
                                    <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faN}></FontAwesomeIcon></label>
                                    <input ref={tourNameIn} onChange={handleChange} name="tourName" value={formData.tourName} className="CostumeInput" placeholder="e.g., Paris Romance"></input>
                                    {errors && <small className="error">{errors.tourName}</small>}
                                </div>
                            </div>
                            <div className="InputContainer">
                                <label>Destination:</label>
                                <div>
                                    <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faMap}></FontAwesomeIcon></label>
                                    <input ref={destinationIn} onChange={handleChange} name="destination" value={formData.destination} className="CostumeInput" placeholder="e.g., Paris France"></input>
                                    {errors.destination && <small className="error">{errors.destination}</small>}
                                </div>
                            </div>
                            <div className="InputContainer">
                                <label>Description:</label>
                                <div>
                                    <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></label>
                                    <textarea ref={descriptionIn} onChange={handleChange} name="description" value={formData.description} className="CostumeInput" placeholder="Describe Your Package"></textarea>
                                    {errors.description && <small className="error">{errors.description}</small>}
                                </div>
                            </div>
                            <div >
                                <label className="Upload" htmlFor="upload">
                                    <input id="upload" type="file" style={{ display: "none" }}></input>
                                    <FontAwesomeIcon className="Icon" icon={faUpload}></FontAwesomeIcon>
                                    <p> Click to Upload or drag and Drop</p>
                                    <p>PNG, JPG, or WebP (max. 5MB)</p>
                                </label>
                            </div>

                        </div>

                    </div>
                    <div className="div2 Section">
                        <div className="SecHeader">
                            <h3> Pricing And Duration:</h3>
                        </div>
                        <div className="InputContainer">
                            <label> Duration (Days) :</label>
                            <div>
                                <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon></label>
                                <input ref={durationIn} type="number" min={1} name="duration" value={formData.duration} className="CostumeInput" placeholder="0"></input>
                            </div>
                            {errors.duration && <small className="error">{errors.duration}</small>}
                        </div>
                        <div className="InputContainer">
                            <label>Amount :</label>
                            <div>
                                <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faDollar}></FontAwesomeIcon></label>
                                <input onChange={handleChange} ref={amountIn} type="number" min={1} name="amount" className="CostumeInput" placeholder="0"></input>
                                {errors.amount && <small className="error">{errors.amount}</small>}
                            </div>
                        </div>
                    </div>
                    <div className="div3 Section Inclusion">
                        <div className="SecHeader">
                            <h3> Includes:</h3>
                        </div>

                        <div className="FlexV">
                            <div className="FlexH">
                                <input className="CostumeCheckBox" type="checkbox"></input>
                                <FontAwesomeIcon className="Icon" icon={faPlaneUp}></FontAwesomeIcon>
                                Flight
                            </div>
                        </div>
                        <div className="FlexV">
                            <div className="FlexH">
                                <input className="CostumeCheckBox" type="checkbox"></input>
                                <FontAwesomeIcon className="Icon" icon={faBed}></FontAwesomeIcon>
                                Hotel
                            </div>
                        </div>
                        <div className="FlexV">
                            <div className="FlexH">
                                <input className="CostumeCheckBox" type="checkbox"></input>
                                <FontAwesomeIcon className="Icon" icon={faCamera}></FontAwesomeIcon>
                                Guided Tours
                            </div>
                        </div>
                        <div className="FlexV">
                            <div className="FlexH">
                                <input className="CostumeCheckBox" type="checkbox"></input>
                                <FontAwesomeIcon className="Icon" icon={faUtensils}></FontAwesomeIcon>
                                Meals
                            </div>
                        </div>
                    </div>
                    <div className="div4 Section">
                        <div className="SecHeader">
                            <h3> Tour Highlights:</h3>
                        </div>

                        {Highlights.map(Highlight => (

                            <div id={Highlight.id} className="InputContainer FlexH" key={Highlight.id}>
                                <div style={{ flexGrow: "1" }}>
                                    <label className="CostumeLabel inputIcon"><FontAwesomeIcon className="Icon" icon={faCamera}></FontAwesomeIcon></label>
                                    <input type="Text" className="CostumeInput SmoothAppear" placeholder="Higlight" ></input>
                                </div>
                                <button onClick={() => RemoveHighlight(Highlight.id)} style={{ display: HighlightsCount > 1 ? "block" : "none" }} className="SecondaryB"><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                            </div>

                        ))}

                        <button className="PrimaryB FlexH" onClick={AddHighlight}><FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>ADD a Higlight</button>

                    </div>
                    <div className="div6 Section">
                        <div className="SecHeader">
                            <h3> Departure Dates:</h3>
                        </div>
                        <label htmlFor="date">
                            <div className="InputContainer">
                                <label>Date:</label>
                                <div>
                                    <input ref={Dateinput} id="date" type="Date" min={today} className={`CostumeInput ${DateValid ? "" : "InvalidIn"}`} placeholder="Select Date" ></input>
                                </div>
                            </div>
                            {errors && <small className="error">{errors.date}</small>}
                            <div className="InputContainer">
                                <label>Spots:</label>
                                <div>
                                    <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon></label>
                                    <input ref={Spotsinput} type="number" min={2} className={`CostumeInput ${SpotsValid ? "" : "InvalidIn"}`} placeholder="1"></input>
                                </div>
                            </div>
                        </label>
                        <button onClick={AddDepartureDate} className="PrimaryB FlexH"><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>ADD Date</button>
                        {DDates.map(Date => (
                            <div key={Date.id} className="Section ">
                                <div className="FlexH_spaceBetween">
                                    <div className="FlexH">
                                        <FontAwesomeIcon className="DateIcon" icon={faCalendar}></FontAwesomeIcon>
                                        <div>
                                            <h4>{Date.Date}</h4>
                                            <div className="Spots">{Date.SpotsTaken}/{Date.Spots} Spots</div>
                                        </div>
                                    </div>
                                    <button className="SecondaryB" onClick={() => DeleteDate(Date.id)}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>

    </>)
}

const Tours = [{

    TourId: 0,

    name: "Paris: City of Lights",
    rating: 4.9,
    RateCount: 234,
    Agency: "MMA Travel",
    location: "Paris, France",


    //!ADD This:
    TotalTickets: 10,
    TicketsBought: 8,

    TotalTickets: 28,

    Includes: [{
        name: "Flight",
        icon: faPlane
    }, {
        name: "Hotel",
        icon: faBed
    }, {
        name: "Meals",
        icon: faUtensils
    }, {
        name: "Tours",
        icon: faCamera
    }],

    Highlights: ["Eiffel Tower", "Seine River cruise with dinner", "Day Trip to Versailles Palace", "Louis Museuem Tour"],

    TourDuration: "7 Days / 6 nights",
    DepartureDate: "Dec 15 2025",

    price: 2999,
    N_Tickets: 2,


    Status: "Active",

}, {
    TourId: 2,
    name: "Paris:",
    rating: 4.9,
    RateCount: 234,
    Agency: "MMA Travel",
    location: "Paris, France",

    //!ADD This:
    TotalTickets: 10,
    TicketsBought: 8,

    TotalTickets: 28,

    Includes: [{
        name: "Flight",
        icon: faPlane
    }, {
        name: "Hotel",
        icon: faBed
    }, {
        name: "Meals",
        icon: faUtensils
    }, {
        name: "Tours",
        icon: faCamera
    }],

    Highlights: ["Eiffel Tower", "Seine River cruise with dinner", "Day Trip to Versailles Palace", "Louis Museuem Tour"],

    TourDuration: "7 Days / 6 nights",
    DepartureDate: "Dec 15 2025",

    price: 2999,
    N_Tickets: 2,


    Status: "Active",
}]
const bookings = [
    {
        customerId: "C001",
        customer: "Ahmed Benali",
        email: "ahmed.benali@example.com",
        phone: "+213 555 12 34 56",
        departureDate: "2025-12-20",
        bookingDate: "2025-11-10",
        tickets: 2,
        paid: 60000, // DA
        status: "Confirmed",
    },
    {
        customerId: "C002",
        customer: "Sara Bouzid",
        email: "sara.bouzid@example.com",
        phone: "+213 556 98 76 54",
        departureDate: "2026-01-05",
        bookingDate: "2025-11-15",
        tickets: 4,
        paid: 120000,
        status: "Pending",
    },
    {
        customerId: "C002",
        customer: "Yacine Haddad",
        email: "yacine.haddad@example.com",
        phone: "+213 557 44 55 66",
        departureDate: "2025-12-31",
        bookingDate: "2025-11-12",
        tickets: 1,
        paid: 25000,
        status: "Cancelled",
    },
];


function ToursManagement() {


    //Actions Menu-------------------------------
    const btnref = useRef();
    const [openCustomer, SetopenCustomers] = useState(false);
    const [openManageDates, SetManageDatesOpen] = useState(false);
    const [open, setopen] = useState(false);
    const [menuindex, setmenuindex] = useState();
    //Dates Management:
    const [DDates, setDDates] = useState([]);
    const [IdCount, setIdCount] = useState(0);
    const Dateinput = useRef();
    const Spotsinput = useRef();
    function AddDepartureDate() {
        const date = Dateinput.current.value.trim();
        const spots = Spotsinput.current.value.trim();
        if (date === "") {

            Dateinput.current.className += " InvalidIn";

        }
        if (spots === "") {
            Spotsinput.current.className += " InvalidIn";
        }
        else {
            console.log(date);
            setDDates(prev => [...prev, { Date: date, Spots: spots, id: IdCount, SpotsTaken: 0 }]);
            setIdCount(IdCount + 1);
        }
    }
    function DeleteDate(id) {

        setDDates(prev => prev.filter(Date => Date.id !== id));
    }
    //--------------------------------------------

    const [ToursList, SetToursList] = useState(Tours);

    useEffect(() => {

        function handleClickOutside(e) {

            if (!btnref.current.contains(e.target)) {

                setopen(false);
            };
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            // Cleanup
            document.removeEventListener("click", handleClickOutside);
        };
    }, [])

    function Portal({ isOpen, onClose, children }) {
        if (!isOpen) return null;

        return createPortal(

            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div className="Section SmoothAppear" style={{ height: "80vh", overflow: "auto" }}>
                    {children}
                    <button className="PrimaryB" onClick={onClose}>Close</button>
                </div>
            </div>


            , document.body)
    }
    function DeleteTour(idToRemove) {
        SetToursList(prev =>
            prev.filter(tour => tour.TourId !== idToRemove)
        );

        setopen(false);


    }
    //ShowDepartureDates---------------------------

    return (<>
        <div className="Section" >

            {ToursList.map((Tour) => (

                <div key={Tour.TourId} className="Section">
                    <div className="FlexH_spaceBetween" >
                        <h4>{Tour.name}</h4>


                        {/*Actions Menu--------------------------------- */}
                        <div style={{ position: "relative" }}>
                            <button ref={btnref} className="ActionsB" onClick={(e) => {


                                e.stopPropagation();// prevent document click from immediately closing it
                                setmenuindex(Tour.TourId);
                                setopen((prev) => (Tour.TourId === menuindex ? !prev : true));


                            }}><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></button>
                            {open && (menuindex == Tour.TourId) &&


                                (<div className="ActionsMenu FlexV" style={{ gap: 0, translate: "-100% 90%" }}>
                                    <h4>Actions</h4>
                                    <button onClick={() => SetopenCustomers(true)} className="FlexH"> <FontAwesomeIcon className="Icon" icon={faUsers}></FontAwesomeIcon><p>View Costumers</p></button>

                                    <button onClick={() => SetManageDatesOpen(true)} className="FlexH"> <FontAwesomeIcon className="Icon" icon={faCalendar}></FontAwesomeIcon><p>Manage Dates</p></button>

                                    <div onClick={() => DeleteTour(Tour.TourId)} className="FlexH DeleteC"> <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon><p>Delete Tour</p></div>
                                </div>)


                            }

                        </div>

                        <Portal isOpen={openManageDates} onClose={() => (SetManageDatesOpen(false))}>
                            <div className="SecHeader">
                                <h3>Manage Departure Dates - {Tour.name}</h3>
                                <p>Add or remove departure dates for this tour</p>
                            </div>
                            <h4>Add a New Departure Date:</h4>
                            <div className="FlexH DatesForm">
                                <input ref={Dateinput} className="CostumeInput" type="Date" min={today}></input>
                                <div className="InputContainer">
                                    <div>
                                        <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon></label>
                                        <input ref={Spotsinput} type="number" min={1} className="CostumeInput" placeholder="Spots"></input>
                                    </div>
                                </div>

                                <button className="PrimaryB FlexH" onClick={AddDepartureDate}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Add</button>
                            </div>
                            <h4>Current DepartureDates:</h4>

                            <hr style={{ width: "100%", margin: "0" }}></hr>
                            {DDates.map(Date => (
                                <div key={Date.id} className="Section ">
                                    <div className="FlexH_spaceBetween">
                                        <div className="FlexH">
                                            <FontAwesomeIcon className="DateIcon" icon={faCalendar}></FontAwesomeIcon>
                                            <div>
                                                <h4>{Date.Date}</h4>
                                                <div className="Spots">{Date.SpotsTaken}/{Date.Spots} Spots</div>
                                            </div>
                                        </div>
                                        <button className="SecondaryB" onClick={() => DeleteDate(Date.id)}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button>
                                    </div>
                                </div>
                            ))}

                        </Portal>
                        <Portal isOpen={openCustomer} onClose={() => (SetopenCustomers(false))}>
                            <div className="SecHeader">
                                <h3>
                                    Booked Customers - {Tour.name}
                                </h3>
                                <p>View all customers who have booked this tour</p>
                            </div>
                            <table className="CostumeTable">
                                <tr>
                                    <th>Costumer</th>
                                    <th>Contact</th>
                                    <th>DepartureDate</th>
                                    <th>bookingDate</th>
                                    <th>Tickets</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                </tr>
                                {bookings.map((costumer, index) => (
                                    <tr key={index} style={{ color: "brown" }}>
                                        <td style={{ color: "black" }}><div ><p>{costumer.customer}</p><p style={{ color: "red" }}>{costumer.customerId}</p></div></td>
                                        <td><div className="Contact">
                                            <p><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> {costumer.email}</p>
                                            <p><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> {costumer.phone}</p>

                                        </div></td>
                                        <td><FontAwesomeIcon icon={faCalendar} style={{ color: "red" }}></FontAwesomeIcon> {costumer.departureDate}</td>
                                        <td >{costumer.bookingDate}</td>
                                        <td style={{ textAlign: "center", color: "black" }}>{costumer.tickets}</td>
                                        <td className="Money">{costumer.paid}DA</td>
                                        <td>
                                            <div className={costumer.status}>
                                                {costumer.status}
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </table>
                        </Portal>

                    </div>
                    <div className="FlexH">
                        <p className="FlexH" style={{ gap: "5px" }}><FontAwesomeIcon icon={faMap} color="brown" />{Tour.location}</p>
                        <p className="FlexH" style={{ gap: "5px" }}><FontAwesomeIcon icon={faClock} color="brown" />{Tour.location}</p>
                        <p className="FlexH Money" style={{ gap: "5px" }}><FontAwesomeIcon icon={faDollar} />{Tour.price} / person</p>
                    </div>
                    <div className="FlexH_spaceBetween TourStat" >

                        <div>
                            <p> Total Bookings: </p>
                            <p> {Tour.TotalTickets} </p>
                        </div>
                        <div>
                            <p> Revenu: </p>
                            <p> {Tour.TotalTickets * Tour.price} $ </p>
                        </div>
                        <div>
                            <p> Departure Dates: </p>
                            <p> {Tour.TotalTickets} </p>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    </>)
}


function AgencyTours() {

    const ToursNavItems = [
        { Section: "Tours Management", Icon: faCompass },
        { Section: "Add a Tour", Icon: faPlus },
    ];
    return (<>



        <div className=" S_Container">

            <nav className="SettingsNav">
                <ul>
                    {ToursNavItems.map((item, index) => (
                        <li key={index}>
                            <NavLink className={({ isActive }) => (isActive ? "NavLink activeNavLink" : "NavLink")} to={`/Profile/Agency Tours/${item.Section}`}>
                                <FontAwesomeIcon icon={item.Icon} />
                                <p>{item.Section}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>



            <Routes>
                <Route index element={<Navigate to="Tours Management" replace />}></Route>
                <Route path="Tours Management" element={<ToursManagement />} />
                <Route path="Add a Tour" element={<AddTour />} />
            </Routes>

        </div>

    </>)
}

export default AgencyTours;
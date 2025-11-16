import { faN, faCompass, faPlus, faSave, faD, faPen, faClock, faDollar, faUpload, faCamera, faPlane, faPlaneUp, faC, faBed, faUtensils, faCalendar, faUser, faEllipsisV, faCaretDown, faEye, faTrashCan, faUsers, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Routes, Route, Navigate, Form } from "react-router-dom";

import './styles/AgencyTours.css'
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";

import { createPortal } from 'react-dom';


function AddTour() {

    const [HighlightsCount, SetHighlightsCount] = useState(1);
    const [HighlightsIDCount, SetHighlightsIDCount] = useState(1);
    const [Highlights, SetHighlights] = useState([{ id: 0 }])

    function AddHighlight() {

        SetHighlightsCount(HighlightsCount + 1);
        SetHighlights(prev => [...prev, { id: HighlightsIDCount }]);
        SetHighlightsIDCount(HighlightsIDCount + 1);



    }
    function RemoveHighlight(idToRemove) {

        SetHighlights(prev => prev.filter(i => i.id !== idToRemove));
        SetHighlightsCount(HighlightsCount - 1);

    }

    const today = new Date().toISOString().split("T")[0];

    return (<>
        <div className="Section">
            <div className="SecHeader FlexH_spaceBetween">
                <div>
                    <h3>Publish New Tour Package</h3>
                    <p>Create and publish a new tour package for your travel agency</p>
                </div>
                <button className="PrimaryB"> <FontAwesomeIcon icon={faSave}> </FontAwesomeIcon>Publish Tour</button>
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
                                <input className="CostumeInput" placeholder="e.g., Paris Romance"></input>
                            </div>
                        </div>
                        <div className="InputContainer">
                            <label>Destination:</label>
                            <div>
                                <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faMap}></FontAwesomeIcon></label>
                                <input className="CostumeInput" placeholder="e.g., Paris France"></input>
                            </div>
                        </div>
                        <div className="InputContainer">
                            <label>Description:</label>
                            <div>
                                <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></label>
                                <textarea className="CostumeInput" placeholder="Describe Your Package"></textarea>
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
                <div class="div2 Section">
                    <div className="SecHeader">
                        <h3> Pricing And Duration:</h3>
                    </div>
                    <div className="InputContainer">
                        <label>Duration:(Days)</label>
                        <div>
                            <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon></label>
                            <input type="number" min={1} className="CostumeInput" placeholder="2 Days,..."></input>
                        </div>
                    </div>
                    <div className="InputContainer">
                        <label>Price Per Person</label>
                        <div>
                            <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faDollar}></FontAwesomeIcon></label>
                            <input type="number" className="CostumeInput" placeholder="Amount"></input>
                        </div>
                    </div>
                    <div className="InputContainer">
                        <label>Spots:</label>
                        <div>
                            <label className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></label>
                            <input type="number" min={2} className="CostumeInput" placeholder="1"></input>
                        </div>
                    </div>
                </div>
                <div class="div3 Section Inclusion">
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
                <div class="div4 Section">
                    <div className="SecHeader">
                        <h3> Tour Highlights:</h3>
                    </div>

                    {Highlights.map(Highlight => (

                        <div id={Highlight.id} className="InputContainer FlexH" key={Highlight.id}>
                            <div style={{ flexGrow: "1" }}>
                                <label className="CostumeLabel inputIcon"><FontAwesomeIcon className="Icon" icon={faCamera}></FontAwesomeIcon></label>
                                <input type="Text" className="CostumeInput" placeholder="Higlight" ></input>
                            </div>
                            <button onClick={() => RemoveHighlight(Highlight.id)} style={{ display: HighlightsCount > 1 ? "block" : "none" }} className="SecondaryB"><FontAwesomeIcon icon={faX}></FontAwesomeIcon></button>
                        </div>

                    ))}

                    <button className="PrimaryB FlexH" onClick={AddHighlight}><FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>ADD a Higlight</button>

                </div>
                <div class="div6 Section">
                    <div className="SecHeader">
                        <h3> Departure Dates:</h3>
                    </div>
                    <label htmlFor="date">
                        <div className="InputContainer">
                            <div>

                                <input id="date" type="Date" min={today} className="CostumeInput" placeholder="Select Date" ></input>
                                <small>ADD a Date</small>
                            </div>
                        </div>
                    </label>
                    <button className="PrimaryB FlexH"><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>ADD Date</button>

                </div>
            </div>
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
}]
function ToursManagement() {


    //Actions Menu-------------------------------
    const btnref = useRef();
    const [openCustomer, SetopenCustomers] = useState(false);
    const [open, setopen] = useState(false)
    const [menuindex, setmenuindex] = useState(null);

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
    function ManageDepartureDates() {

    }
    function ShowCustomers({ isOpen, onClose, children }) {
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
                justifyContent: 'center'
            }}>
                <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px'
                }}>
                    {children}
                    <button onClick={onClose}>Close</button>
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
                                    <button onClick={ShowCustomers} className="FlexH"> <FontAwesomeIcon className="Icon" icon={faUsers}></FontAwesomeIcon><p>View Costumers</p></button>

                                    <button onClick={ManageDepartureDates} className="FlexH"> <FontAwesomeIcon className="Icon" icon={faCalendar}></FontAwesomeIcon><p>Manage Dates</p></button>

                                    <div onClick={() => DeleteTour(Tour.TourId)} className="FlexH DeleteC"> <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon><p>Delete Tour</p></div>
                                </div>)


                            }

                        </div>


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
                    <button className="SecondaryB"><FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon> Show Departure Dates</button>




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
                            <NavLink className={({ isActive }) => (isActive ? "NavLink activeNavLink" : "NavLink")} to={`/Agency Tours/${item.Section}`}>
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEllipsisV, faEnvelope, faPhone, faCalendar, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import './styles/AgencyCostumers.css'
import { useEffect, useRef, useState } from "react";

const customers = [
    { customerId: "C001", customer: "Ahmed Benali", contact: { email: "ahmed.benali@example.com", phone: "+213 661 23 45 67" }, bookings: 5, totalSpent: "2450 DZD", joinDate: "2022-03-14", lastBooking: "2025-10-02" },
    { customerId: "C002", customer: "Sara Bouzid", contact: { email: "sara.bouzid@example.com", phone: "+213 775 92 34 11" }, bookings: 3, totalSpent: "1120 DZD", joinDate: "2023-01-09", lastBooking: "2025-08-17" },
    { customerId: "C003", customer: "Youssef Amrani", contact: { email: "youssef.amrani@example.com", phone: "+213 699 84 90 23" }, bookings: 8, totalSpent: "4980 DZD", joinDate: "2021-11-21", lastBooking: "2025-11-03" },
    { customerId: "C004", customer: "Layla Haddad", contact: { email: "layla.haddad@example.com", phone: "+213 555 13 77 42" }, bookings: 2, totalSpent: "740 DZD", joinDate: "2023-06-10", lastBooking: "2025-09-12" },
    { customerId: "C005", customer: "Karim Mansouri", contact: { email: "karim.mansouri@example.com", phone: "+213 774 33 12 74" }, bookings: 6, totalSpent: "3280 DZD", joinDate: "2022-05-18", lastBooking: "2025-10-22" },
    { customerId: "C006", customer: "Nour El Houda", contact: { email: "nour.elhouda@example.com", phone: "+213 669 55 61 09" }, bookings: 4, totalSpent: "1870 DZD", joinDate: "2023-02-27", lastBooking: "2025-07-29" },
    { customerId: "C007", customer: "Rami Bensaid", contact: { email: "rami.bensaid@example.com", phone: "+213 662 44 67 30" }, bookings: 9, totalSpent: "6150 DZD", joinDate: "2021-09-05", lastBooking: "2025-11-08" },
    { customerId: "C008", customer: "Amina Cherif", contact: { email: "amina.cherif@example.com", phone: "+213 778 30 09 55" }, bookings: 1, totalSpent: "380 DZD", joinDate: "2024-03-02", lastBooking: "2025-06-14" }
];




function Ag_Costumers() {

    const btnref = useRef();
    const [open, setopen] = useState(false)
    const [menuindex, setmenuindex] = useState(null);
    const [CostumersList, setCostumersList] = useState(customers);

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

    function deleteCustomer(idToRemove) {

        const index = customers.findIndex(obj => obj.id === idToRemove);
        customers.splice(index, 1);

        setCostumersList(prev => prev.filter(costumer => costumer.customerId !== idToRemove));
        setopen(false);
    }

    function Search(e) {
        const value = e.target.value.trim();
        console.log(value);

        if (value.trim() === "") {
            setCostumersList(customers);
        }
        else {

            setCostumersList(customers.filter(customer =>
                customer.customer.toLowerCase().startsWith(value.toLowerCase()) ||
                customer.customerId.toLowerCase().startsWith(value.toLowerCase()) ||
                customer.contact.email.toLowerCase().startsWith(value.toLowerCase()) ||
                customer.contact.phone.toLocaleLowerCase().startsWith(value.toLowerCase())
            ))
        }


    }

    return (<>
        <div className="S_Container :">
            <div className="Section">
                <div className="SecHeader">

                    <h2>Costumers </h2>

                </div>
                <div className="Section" style={{ backgroundColor: "white" }}>
                    <div className="InputContainer">
                        <div>
                            <label for="search" className="CostumeLabel inputIcon"><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></label>
                            <input onChange={Search} id="search" className="CostumeInput" placeholder="Search by name,email,ID..."></input>
                        </div>
                    </div>
                </div>
                <div className="Section" style={{ backgroundColor: "white" }}>
                    <div className="FlexH_spaceBetween">
                        <p style={{ fontWeight: "600" }}>Costumers List:</p>
                        <p style={{ color: "brown" }}>Showing 8 of 10 Costumers</p>
                    </div>


                    <div className="TableContainer">
                        <table className="CostumeTable" style={{ zIndex: 0 }}>
                            <tr>
                                <th>Custumer</th>
                                <th>Contact</th>
                                <th>Bookings</th>
                                <th>total Spent</th>
                                <th>Join Date</th>
                                <th>Last Booking</th>
                                <th>Actions</th>
                            </tr>
                            {CostumersList.map((costumer, index) => (
                                <tr key={index} style={{ color: "brown" }}>
                                    <td style={{ color: "black" }}><div ><p>{costumer.customer}</p><p style={{ color: "red" }}>{costumer.customerId}</p></div></td>
                                    <td><div className="Contact">
                                        <p><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> {costumer.contact.email}</p>
                                        <p><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> {costumer.contact.phone}</p>

                                    </div></td>
                                    <td><FontAwesomeIcon icon={faCalendar} style={{ color: "red" }}></FontAwesomeIcon> {costumer.bookings}</td>
                                    <td className="Money">{costumer.totalSpent}</td>
                                    <td>{costumer.joinDate}</td>
                                    <td>{costumer.lastBooking}</td>
                                    <td className="ActionsCell">


                                        <button ref={btnref} className="ActionsB" onClick={(e) => {

                                            e.stopPropagation();// prevent document click from immediately closing it
                                            setmenuindex(index);
                                            setopen((prev) => (index === menuindex ? !prev : true));

                                        }}>


                                            <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon></button>
                                        {open && (menuindex === index) &&
                                            (<div className="ActionsMenu FlexV" style={{ gap: 0 }}>
                                                <h4>Actions</h4>
                                                <button onClick={() => deleteCustomer(costumer.customerId)} className="FlexH_spaceBetween DeleteC"> <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon><p>Delete Costumer</p></button>
                                            </div>)}

                                    </td>
                                </tr>

                            ))}

                        </table>
                    </div>
                </div>
            </div>





        </div>
    </>)
}
export default Ag_Costumers;
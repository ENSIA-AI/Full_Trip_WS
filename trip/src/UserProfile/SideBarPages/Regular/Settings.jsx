import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShield, faCreditCard, faWallet, faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import { useRef, useState } from "react";
import './Styles/Settings.css'


function Settings() {



    const SettingsNavItems = [
        { Section: "Personal Info", Icon: faUser },
        { Section: "Security", Icon: faShield },
        { Section: "Billing", Icon: faWallet },
    ];

    return (
        <>
            <div className="S_Container">
                <section>
                    <h1>Settings</h1>
                    <p>Manage your account settings and preferences</p>
                </section>

                <nav className="SettingsNav">
                    <ul>
                        {SettingsNavItems.map((item, index) => (
                            <li key={index}>
                                <NavLink className={({ isActive }) => (isActive ? "NavLink activeNavLink" : "NavLink")} to={`/Profile/Settings/${item.Section}`}>
                                    <FontAwesomeIcon icon={item.Icon} />
                                    <p>{item.Section}</p>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Routes>
                    <Route index element={<Navigate to="Personal Info" replace />} />
                    <Route path="Personal Info" element={<Profile />} />
                    <Route path="Security" element={<Security />} />
                    <Route path="Billing" element={<Billing />} />
                </Routes>
            </div>
        </>
    );
}




function Profile() {


    const firstNameIn = useRef();
    const lastNameIn = useRef();
    const emailIn = useRef();
    const phoneNumberIn = useRef();
    const addressIn = useRef();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
    });
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));//resets errors
    }
    function validate(values) {

        const newErrors = {};

        // First name
        if (!values.firstName.trim()) {

            newErrors.firstName = "First name is required.";

            firstNameIn.current.classList.add("InvalidIn");
        } else if (values.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be at least 2 characters.";

            firstNameIn.current.classList.add("InvalidIn");
        }
        else {
            firstNameIn.current.classList.remove("InvalidIn");

        }

        // Last name
        if (!values.lastName.trim()) {
            newErrors.lastName = "Last name is required.";

            lastNameIn.current.classList.add("InvalidIn");
        } else if (values.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters.";
            lastNameIn.current.classList.add("InvalidIn");
        }
        else {
            lastNameIn.current.classList.remove("InvalidIn");
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!values.email.trim()) {
            newErrors.email = "Email is required.";

            emailIn.current.classList.add("InvalidIn");
        } else if (!emailRegex.test(values.email.trim())) {
            newErrors.email = "Enter a valid email address.";
            emailIn.current.classList.add("InvalidIn");
        }
        else {
            emailIn.current.classList.remove("InvalidIn");

        }


        // Phone
        const phoneRegex = /^(05|06|07)[0-9]{8}$/;

        if (!values.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required.";
            phoneNumberIn.current.classList.add("InvalidIn");
        } else if (!phoneRegex.test(values.phoneNumber.trim())) {
            newErrors.phoneNumber = "Phone must be an algerian number.";
            phoneNumberIn.current.classList.add("InvalidIn");
        }
        else {
            phoneNumberIn.current.classList.remove("InvalidIn");

        }

        // Address
        if (!values.address.trim()) {
            newErrors.address = "Address is required.";
            addressIn.current.classList.add("InvalidIn");
        } else if (values.address.trim().length < 3) {
            newErrors.address = "Address is too short.";
            addressIn.current.classList.add("InvalidIn");
        }
        else {
            addressIn.current.classList.remove("InvalidIn");

        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    }
    function handleReset() {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
        });

        addressIn.current.classList.remove("InvalidIn");
        firstNameIn.current.classList.remove("InvalidIn");
        lastNameIn.current.classList.remove("InvalidIn");
        phoneNumberIn.current.classList.remove("InvalidIn");
        emailIn.current.classList.remove("InvalidIn");

        setErrors({});
    }



    return (<>


        <div className="Section">
            <div className="SecHeader">
                <h3>Profile informations</h3>
                <p>Update your personal information</p>

            </div>
            <form onSubmit={handleSubmit} onReset={handleReset} >
                <div className="InfoForm">
                    <div className="InfoFormInput">
                        <label>First Name</label>
                        <input name="firstName" value={formData.firstName} ref={firstNameIn} onChange={handleChange} type="text" ></input>
                        {errors.firstName && <small className="error">{errors.firstName}</small>}
                    </div>

                    <div className="InfoFormInput">
                        <label>Last Name</label>
                        <input name="lastName" value={FormData.lastName} ref={lastNameIn} onChange={handleChange} type="text"></input>
                        {errors.lastName && <small className="error">{errors.lastName}</small>}

                    </div>

                    <div className="InfoFormInput" style={{ gridColumn: "span 2" }}>
                        <label>Email</label>
                        <FontAwesomeIcon icon={faEnvelope} className="InfoFormIcon" ></FontAwesomeIcon>
                        <input name="email" value={FormData.email} ref={emailIn} onChange={handleChange} type="email" style={{ paddingLeft: "40px" }} placeholder="example@gmail.com"></input>
                        {errors.lastName && <small className="error">{errors.lastName}</small>}

                    </div>
                    <div className="InfoFormInput" >
                        <label>Phone Number</label>
                        <FontAwesomeIcon icon={faPhone} className="InfoFormIcon"></FontAwesomeIcon>
                        <input name="phoneNumber" value={FormData.phoneNumber} ref={phoneNumberIn} onChange={handleChange} type="text" style={{ paddingLeft: "40px" }} placeholder="0540493067"></input>
                        {errors.phoneNumber && <small className="error">{errors.phoneNumber}</small>}
                    </div>
                    <div className="InfoFormInput">
                        <label>Address</label>
                        <FontAwesomeIcon icon={faLocationDot} className="InfoFormIcon"></FontAwesomeIcon>
                        <input name="address" value={FormData.address} ref={addressIn} onChange={handleChange} type="text" style={{ paddingLeft: "40px" }} placeholder="Algeirs"></input>
                        {errors.address && <small className="error">{errors.address}</small>}
                    </div>
                </div>
                <div className="Submition" style={{}}>
                    <input type="reset" className="SecondaryB" />
                    <input type="submit" className="PrimaryB" value={"Save Changes"} />
                </div>
            </form>
        </div>







    </>);
}
function Security() {


    return <>
        <div className="Section">
            <div className="SecHeader">
                <h3>Change Password</h3>
                <p>Update your password to keep your account secure</p>
            </div>
            <form className="PassChangeForm">
                <div className="InfoFormInput">
                    <label>Current Password</label>
                    <input type="text" ></input>
                </div>
                <div className="InfoFormInput">
                    <label>New Password</label>
                    <input type="text" ></input>
                </div>
                <div className="InfoFormInput">
                    <label>Confirm New Password</label>
                    <input type="text" ></input>
                </div>
                <div>
                    <input type="submit" className="PrimaryB" value={"Update Password"}></input>
                </div>
            </form>
        </div>

    </>
}


/*Billing----------------------------------------------------------------------- */
const Cards = [
    { CardNum: "0545 4534 3454 3453", isDefault: true, expiringDate: "02/27" },
    { CardNum: "0545 4534 3454 4829", isDefault: false, expiringDate: "03/29" }
]

function CreditCard({ CardNum, isDefault, expiringDate }) {

    function DefaultIndicator() {
        return (
            <p className="DefaultInd">Default</p>
        )
    }

    let maskedNum = ".... .... .... " + CardNum.slice(-4);
    return (<>
        <div className={`Section ${isDefault ? "Default" : ""}`}>
            <div className="CreditCard">
                <div style={{ display: "flex", alignItems: "Center", gap: "20px" }}>
                    <FontAwesomeIcon icon={faCreditCard} className={isDefault ? "CardI Default" : "CardI"}></FontAwesomeIcon>
                    <div>

                        <h3>{maskedNum}</h3>
                        <p>Expires {expiringDate}</p>
                    </div>

                </div>
                <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    {isDefault && <DefaultIndicator />}
                    <button className=" SecondaryB EditCard">Edit</button>
                    <button className="SecondaryB RemoveCard">Remove</button>
                </div>
            </div>
        </div>

    </>)

}
function Billing() {

    return (<>

        <div className="Section" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="SecHeader" >
                <h3>Payment Methodes</h3>
                <p>Manage your saved payment methods</p>
            </div>
            {
                Cards.map((item, index) => (
                    <CreditCard key={index} CardNum={item.CardNum} isDefault={item.isDefault} expiringDate={item.expiringDate}></CreditCard>
                ))
            }

            <button className="PrimaryB"> <FontAwesomeIcon icon={faCreditCard} />Add Payment Method</button>
        </div>
        {/* ADD Billing History */}




    </>)

}




export default Settings
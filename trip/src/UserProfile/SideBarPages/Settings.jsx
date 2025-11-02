import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShield, faWallet, faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import './Styles/Settings.css'



function Billing() {
    return <p>nikmk ya l3tayd</p>
}

function Settings() {
    const SettingsNavItems = [
        { Section: "Profile", Icon: faUser },
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
                                <NavLink className={({ isActive }) => (isActive ? "NavLink activeNavLink" : "NavLink")} to={`/Settings/${item.Section}`}>
                                    <FontAwesomeIcon icon={item.Icon} />
                                    <p>{item.Section}</p>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Routes>
                    <Route index element={<Navigate to="Profile" replace />} />
                    <Route path="Profile" element={<Profile />} />
                    <Route path="Security" element={<Security />} />
                    <Route path="Billing" element={<Billing />} />
                </Routes>
            </div>
        </>
    );
}




function Profile() {
    return (<>


        <div className="SettingsSec">
            <div className="SecHeader">
                <h3>Profile informations</h3>
                <p>Update your personal information and profile picture</p>

            </div>
            <form >
                <div className="InfoForm">
                    <div className="InfoFormInput">
                        <label>First Name</label>
                        <input type="text" ></input>
                    </div>

                    <div className="InfoFormInput">
                        <label>Last Name</label>
                        <input type="text"></input>
                    </div>

                    <div className="InfoFormInput" style={{ gridColumn: "span 2" }}>
                        <label>Email</label>
                        <FontAwesomeIcon icon={faEnvelope} className="InfoFormIcon" ></FontAwesomeIcon>
                        <input type="email" style={{ paddingLeft: "40px" }} placeholder="example@gmail.com"></input>
                    </div>
                    <div className="InfoFormInput" >
                        <label>Phone Number</label>
                        <FontAwesomeIcon icon={faPhone} className="InfoFormIcon"></FontAwesomeIcon>
                        <input type="text" style={{ paddingLeft: "40px" }} placeholder="0540493067"></input>
                    </div>
                    <div className="InfoFormInput">
                        <label>Address</label>
                        <FontAwesomeIcon icon={faLocationDot} className="InfoFormIcon"></FontAwesomeIcon>

                        <input type="text" style={{ paddingLeft: "40px" }} placeholder="Algeirs"></input>
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
        <div className="SettingsSec">
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




export default Settings
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShield, faWallet } from "@fortawesome/free-solid-svg-icons";

import './Styles/Settings.css'


function Security() {
    return <p>nimkmk</p>
}
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
            <div style={{ borderBottom: "2px solid var(--border)", paddingBottom: "15px" }}>
                <h3>Profile informations</h3>
                <p>Update your personal information and profile picture</p>

            </div>
            <form className="InfoForm">
                <div className="InfoFormInput">
                    <label>First Name</label>
                    <input type="text"></input>
                </div>

                <div className="InfoFormInput">
                    <label>Last Name</label>
                    <input type="text"></input>
                </div>

                <div className="InfoFormInput">
                    <label>Email</label>
                    <input type="text"></input>
                </div>
                <div className="InfoFormInput">
                    <label>Phone Number</label>
                    <input type="text"></input>
                </div>
                <div className="InfoFormInput">
                    <label>Last Name</label>
                    <input type="text"></input>
                </div>
                <div className="InfoFormInput">
                    <label>Last Name</label>
                    <input type="text"></input>
                </div>






            </form>
        </div>







    </>);
}

export default Settings
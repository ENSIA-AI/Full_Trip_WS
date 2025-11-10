import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding, faArrowLeft } from "@fortawesome/free-solid-svg-icons";


import '../index.css'
import './ProfileHeader.css'


function ProfileHeader({ Username = "User", U_type = "Regular" }) {

    return (<>
        <nav className="ProfileHaeder">
            <button className="PrimaryB"><FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff", fontWeight: "bold", fontSize: "1em" }} /></button>

            <div className="Profile_Username">
                <div>
                    <p className="UserName">{Username}</p>
                    <p className="P-Type">{U_type}</p>
                </div>
                <FontAwesomeIcon icon={U_type === "Agency" ? faBuilding : faUser} style={{ color: "#e74211", fontSize: "2.5em" }} />
            </div>
        </nav>
    </>)
}



export default ProfileHeader
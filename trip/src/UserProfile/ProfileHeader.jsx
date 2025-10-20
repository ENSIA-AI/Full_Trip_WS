import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowLeft } from "@fortawesome/free-solid-svg-icons";


import Logo from "../landingPage/images/title-icon.svg"
import '../index.css'
import './ProfileHeader.css'


function ProfileHeader() {

    const Username="Zakarya"
    const U_type="Regular User"
    return (<>
        <nav>
            <button className="PrimaryB"><FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff",fontWeight:"bold",fontSize:"1.2em" }} /></button>
            <img src={Logo} alt="Logo"></img>
            <div className="Profile_Username">
                <div>
                    <p className="UserName">{Username}</p>
                    <p className="P-Type">{U_type}</p>
                </div>
                <FontAwesomeIcon icon={faUser} style={{ color: "#e74211", fontSize: "2.5em" }} />
            </div>
        </nav>
    </>)
}



export default ProfileHeader
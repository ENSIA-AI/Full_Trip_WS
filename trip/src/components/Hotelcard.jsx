import './css/hotelcard.css';
import bg from '../assets/Hotelsposter.jpg';
function Hotelcard() { 
   
    function onfavorite() { 
        alert("clicked"); 
        }

return ( 
    <div className="hotelcard"> 
         <img src={bg} alt="This is the hotel  image" className="hotle-poster" />
         <div className="hotel-overlay">
                    <button className="favorite-btn" onClick={onfavorite}>
                        🤍
                    </button>
                </div>
         <div className="hotel-info">
         <h3>Hotle name</h3>
         <h3> hotel country</h3>
         <h3>hotel distace form downtown</h3>
         </div>
    </div>
); 

} 


export default Hotelcard
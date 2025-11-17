import './css/hotelcard.css';
import bg from '../assets/Hotelsposter.jpg';
function Hotelcard() { 
   
    const button = document.getElementById("button");
    function onfavorite() { 
         button.style.background.color= red;
         console.log(button.background);
        }

return ( 
    <>
    <div className="hotelcard"> 
         <img src={bg} alt="This is the hotel  image" className="hotle-poster" />
         
         <div className="hotel-info">
         <h3>Name</h3>
         <h3>City</h3>
         <h3>Country</h3>
         <h3>Rating: ⭐⭐⭐⭐</h3>
         <div className="purchase-button"> 
            <button>Book</button>
         </div>
         </div>
    </div>

    </>

); 

} 


export default Hotelcard
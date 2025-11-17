import './css/hotelcard.css';
import bg from '../assets/plane.jpg';
function Plane() { 
   
    
    

return ( 
    <>
    <div className="hotelcard"> 
         <img src={bg} alt="This is the hotel  image" className="hotle-poster" />
         
         <div className="hotel-info">
        <h3>Airport</h3>
         <h3>Price:</h3>
         <h3>Depart(date)</h3>
         <h3>Return(date)</h3>
         <details><h3>Depart Time(hh:mm:ss)</h3>
         <h3>Time(hh:mm:ss)</h3>
         <h3>Fly type?</h3>
         <h3>sites?</h3>
         <h3>Stop Or Non stop :?</h3>
         <h3>Meal Provided?</h3>
         <h3>Overhead Entertaiment</h3>
         <h3>Bags?</h3>
         </details>
         

         <div className="purchase-button"> 
            <button>Ticket</button>
         </div>
         </div>
    </div>

    </>

); 

} 


export default Plane
import Navbar  from "../components/Navbar";
import Searcharea from "../components/Searchbar";
import Hotelcard  from "../components/Hotelcard";
import './css/page.css'
function Hotels() { 
    return (<>
   
    <Navbar></Navbar>
    <div className="Show">
     <h1>This is Our Hotels Page</h1>
    </div>
    <div className="output">
        <Searcharea></Searcharea>
         <div className="outputarea">
            <Hotelcard></Hotelcard>
            <Hotelcard></Hotelcard>
            <Hotelcard></Hotelcard>
            <Hotelcard></Hotelcard>
            <Hotelcard></Hotelcard>
         </div>
    </div>

    </>);

}


export default Hotels;
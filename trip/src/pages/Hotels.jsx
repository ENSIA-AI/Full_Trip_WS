import Navbar  from "../components/Navbar";
import Searcharea from "../components/Searchbar";
import './css/page.css'
function Hotels() { 
    return (<>
   
    <Navbar></Navbar>
    <div className="Show">
     <h1>This is Our Hotels Page</h1>
    </div>
    <div className="output">
        <Searcharea></Searcharea>

    </div>

    </>);

}


export default Hotels;

import Searcharea from "../components/Searchbar";
import Navbar from '../components/Navbar.jsx';
function Flights() {
    return (<>
        <h2>This is the flights pages</h2>
        <header>
            <Navbar></Navbar>
        </header>
        <main>
            <div className="name">

            </div>
            <div className="display">
                <Searcharea></Searcharea>
            </div>
        </main>
        <footer>
            
        </footer>

    </>);

}


export default Flights;
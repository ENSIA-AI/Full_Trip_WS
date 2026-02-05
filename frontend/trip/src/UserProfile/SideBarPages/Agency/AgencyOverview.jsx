import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/AgencyOverview.css'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { faUsers, faCompass, faDollar, faXmark } from '@fortawesome/free-solid-svg-icons';
import StatsCard from '../../UI/StatCard';
import api from '../../API/PHP_API';

const data = [
    { Month: "Jan", count: 68 },
    { Month: "Feb", count: 30 },
    { Month: "Mar", count: 70 },
    { Month: "Apr", count: 100 },
    { Month: "May", count: 70 },
];


const bookings = [
    { BookingID: "B001", Customer: "Alice Brown", Tour: "Paris City Lights", Date: "2025-03-12", Amount: 1200, Status: "Confirmed" },
    { BookingID: "B002", Customer: "John Smith", Tour: "Rome Ancient Wonders", Date: "2025-04-05", Amount: 950, Status: "Pending" },
    { BookingID: "B003", Customer: "Maria Lopez", Tour: "Tokyo Highlights", Date: "2025-02-28", Amount: 1450, Status: "Cancelled" },
    { BookingID: "B004", Customer: "David Miller", Tour: "New York Explorer", Date: "2025-05-10", Amount: 1100, Status: "Confirmed" },
    { BookingID: "B005", Customer: "Sofia Rossi", Tour: "Dubai Luxury Tour", Date: "2025-01-22", Amount: 2100, Status: "Confirmed" },
    { BookingID: "B006", Customer: "Ethan Clark", Tour: "Cairo Pyramids", Date: "2025-03-01", Amount: 1300, Status: "Pending" },
    { BookingID: "B007", Customer: "Olivia Davis", Tour: "London Royal Tour", Date: "2025-04-18", Amount: 980, Status: "Confirmed" },
    { BookingID: "B008", Customer: "Noah Wilson", Tour: "Bangkok Adventure", Date: "2025-05-02", Amount: 890, Status: "Cancelled" },
    { BookingID: "B009", Customer: "Emma Johnson", Tour: "Sydney Coastal Trip", Date: "2025-06-15", Amount: 1750, Status: "Pending" },
    { BookingID: "B010", Customer: "Liam Martinez", Tour: "Cape Town Safari", Date: "2025-02-14", Amount: 1600, Status: "Confirmed" }
];




const response = await api.get('./overview.php');

console.log(response);

const result=response.data;


let recent_Bookings;

if(result.status==="success"){
    recent_Bookings=result.data;
}
else{
    console.error(result.ERR);
}






function AgencyOverview() {



    return (<>

        <div className='S_Container'>

            {/* LastBookings------------------------------------- */}
            <div className='Section'>
                <div className='SecHeader'>
                    <h2>Recent Bookings:</h2>
                    <p>Review your Last Bookings</p>
                </div>
                <div className='TableContainer' style={{overflow:"auto"}}>
                    <table className='CostumeTable' style={{ backgroundColor: "white" }}>
                        <tr>
                            <th>Booking ID</th>
                            <th>Costumer</th>
                            <th>Tour</th>
                            <th>Date</th>

                            <th>Status</th>
                        </tr>
                        {recent_Bookings.map((Booking, index) => (
                            <tr key={index}>
                                <td>{Booking.id}</td>
                                <td>{Booking.first_name}</td>
                                <td>{Booking.tour_name}</td>
                                <td>{Booking.reserved_at.split(' ')[0]}</td>
                                <td><div className={Booking.status}>{Booking.status}</div></td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>



    </>)


}

export default AgencyOverview;
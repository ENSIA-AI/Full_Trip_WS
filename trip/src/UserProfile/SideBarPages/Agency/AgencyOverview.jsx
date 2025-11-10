import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/AgencyOverview.css'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
    { Month: "Jan", count: 68 },
    { Month: "Feb", count: 30 },
    { Month: "Mar", count: 70 },
    { Month: "Apr", count: 100 },
    { Month: "May", count: 70 },
];

import { faUsers, faCompass, faDollar, faXmark } from '@fortawesome/free-solid-svg-icons';




function SatsCard({ Title, Number, Icon, Change_rate = 0 }) {

    return (<>
        <div className='StatCard'>
            <div className='Info'>
                <h3>{Title}</h3>
                <p className={Title === "Revenu" ? "StatNum Money" : "StatNum"}>{Number} {Title === "Revenu" ? "$" : ""}</p>
                <p className={Change_rate >= 0 ? "PChange" : "NChange"}> <span>{Change_rate >= 0 ? "↑" : "↓"} {Change_rate}%</span> vs Last Month</p>
            </div>
            <div>
                <FontAwesomeIcon icon={Icon} className='Icon'></FontAwesomeIcon>
            </div>
        </div>

    </>)

}


function AgencyOverview() {

    return (<>

        <div className='S_Container'>
            <div className='Stats'>
                <SatsCard Title="Total Bookings" Number={213} Icon={faUsers} Change_rate={-8} ></SatsCard>
                <SatsCard Title="Tours" Number={2} Icon={faCompass} ></SatsCard>
                <SatsCard Title="Revenu" Number={49123} Icon={faDollar} ></SatsCard>
                <SatsCard Title="Cancelations" Number={213} Icon={faXmark} ></SatsCard>
            </div>
            {/*Graph-------------------------------------------- */}
            <div className=' Section'>
                <div className='SecHeader'>
                    <h3>Costumers Statistics:</h3>
                    <p>Review your Agency Statistics</p>
                </div>
                <div className='Graph'>
                    <ResponsiveContainer width="100%" height="80%">
                        <LineChart data={data}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="Month" />
                            <YAxis domain={[0, 'dataMax + 20']} />
                            <Tooltip
                                wrapperStyle={{ backgroundColor: "#222", border: "1px solid #555", borderRadius: "0.625em" }}
                                contentStyle={{ backgroundColor: "#333", color: "#fff", borderRadius: "0.625em" }}
                                itemStyle={{ color: "#0ff" }}
                                labelStyle={{ color: "#ccc", fontWeight: "bold" }}
                            />
                            <Line type="monotone" dataKey="count" stroke="#e74211" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className='GraphKeys'>
                        <div className='Key'>
                            <div className='square' style={{ backgroundColor: "#e74211" }}></div>
                            <p> Costumers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*LastBookings-------------------------------------*/}
            <div className='Section'>
                <div className='SecHeader'>
                    <h3>Recent Bookings:</h3>
                </div>
                <table className='CostumeTable' style={{marginTop:"30px"}}>
                    <tr>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello </th>
                        <th>Hello</th>
                    </tr>
                    <tr>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello</th>

                    </tr>
                    <tr>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello</th>
                        <th>Hello</th>
                    </tr>
                </table>
            </div>
        </div>



    </>)


}

export default AgencyOverview;
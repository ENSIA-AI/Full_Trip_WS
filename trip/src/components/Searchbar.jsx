import './css/Searcharea.css';
import React, { useState } from 'react';
function Searcharea() {

    const today = new Date().toISOString().split('T')[0];

    const [checkin, setCheckin] = useState(today);
    const [checkout, setCheckout] = useState(today);
    return (
        <>
        
            <div className='inforamtions'>
                <input type="text" id="place" placeholder='City Or Hotle name ' />
                <form>
                    <input type="date" name="checkin" id="checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                    <input type="date" id="checkout" name="checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                </form>
                <form className="persons">
                 <input type="number"  min="0" name="adults" id="adults" placeholder='Adults' />
                 <input type="number"  min="0" name="Children" id="Children" placeholder='Childrens' />
                 <input type="number"  min="0" name="Pets" id="Pets" placeholder='Pets' />
                </form>
                <input type="number" id="Budget" min="0" placeholder='Enter your budget (ex.: 50$)' />
                <button className='form'>Search</button>
            </div>
            
        </>
    );
}


export default Searcharea
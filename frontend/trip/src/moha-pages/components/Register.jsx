import './css/register.css'
import { useState, useEffect, useRef } from 'react'
import { Country, State } from 'country-state-city'
import Aos from 'aos'

export default function Register() {
  const [countries] = useState(Country.getAllCountries());
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countrySelected, setCountrySelected] = useState(false);
  const [states, setStates] = useState([]);
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [algerianPhoneValid, setAlgerianPhoneValid] = useState(false);
  
  const [pwd, setPwd] = useState('');
  const [validePwd, setValidePwd] = useState(true);
  const [confirmPwd, setConfirmPwd] = useState('');
  const [valideConfirmPassword, setValideConfirmPassword] = useState(true);

  const [user, setUser] = useState({
    first_name: '', last_name: '', email: '', country: '', state: '', currency: '', phone_num: '', password: ''
  });

  const pwdRef = useRef(null);
  const currentPwdRef = useRef(null);
  const phoneNumRef = useRef(null);

  const enterPhoneNum = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhoneNum(input);
    if (selectedCountry?.isoCode === 'DZ') {
      if (input.length === 9 && (['5','6','7'].includes(input[0]))) {
         setAlgerianPhoneValid(true);
         setUser(prev => ({ ...prev, phone_num: `+${phoneCode} ${input}` }));
      } else { setAlgerianPhoneValid(false); }
    } else {
       setUser(prev => ({ ...prev, phone_num: `+${phoneCode} ${input}` }));
       setAlgerianPhoneValid(true);
    }
  };

  const handelCountryChange = (country) => {
    setSelectedCountry(country);
    setCountrySelected(true);
    setStates(State.getStatesOfCountry(country.isoCode));
    setPhoneCode(country.phonecode || '');
    setUser(prev => ({ ...prev, country: country.name, currency: country.currency }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    
    // Validation Checks
    if (selectedCountry?.isoCode === 'DZ' && !algerianPhoneValid) { alert('Fix phone number'); return; }
    if (pwd.length < 8) { alert('Password too short'); return; }
    if (pwd !== confirmPwd) { alert('Passwords do not match'); return; }

    const finalUser = { ...user, password: pwd };

    try {
      // ---------------------------------------------------------
      // REQUEST 1: REGISTER
      // ---------------------------------------------------------
      const response = await fetch('http://localhost/Full_Trip_WS/backend/Mohammed/REG/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalUser)
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ Account created! Please Login.');
        // Clear form logic here if needed
      } else {
        alert('❌ Error: ' + data.error);
      }
    } catch (error) {
      alert('❌ Network Error');
    }
  };

  useEffect(() => { Aos.init({ duration: 1700 }) }, []);

  // Simplified Return for brevity (use your existing HTML structure)
  return (
    <div className='reg-container'>
       <div className='register-page'>
         <h1>Welcome In Travel<span>W</span>Us</h1>
         <form className='register-form' onSubmit={handelSubmit}>
             {/* ... Your Inputs (Name, Email, Country, Phone, Passwords) ... */}
             <div className='first-sec'>
                 <label>First Name <input onChange={e => setUser({...user, first_name:e.target.value})} required/></label>
                 <label>Last Name <input onChange={e => setUser({...user, last_name:e.target.value})} required/></label>
                 <label>Email <input type='email' onChange={e => setUser({...user, email:e.target.value})} required/></label>
                 
                 <label>Country 
                    <select onChange={e => handelCountryChange(countries.find(c => c.isoCode === e.target.value))}>
                        <option>Select</option> 
                        {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                    </select>
                 </label>
                 
                 {/* ... Other Inputs (State, Currency, Phone, Passwords) ... */}
                 <label>Password <input type='password' onChange={e => setPwd(e.target.value)}/></label>
                 <label>Confirm <input type='password' onChange={e => setConfirmPwd(e.target.value)}/></label>
                 
                 <button type='submit'>Create Account</button>
             </div>
         </form>
       </div>
    </div>
  );
}
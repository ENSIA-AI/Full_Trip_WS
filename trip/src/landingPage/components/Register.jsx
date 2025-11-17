import '../styles/register.css'
import { useState, useEffect, useRef } from 'react'
import { Country, State, City } from 'country-state-city'
import Aos from 'aos'

export default function Register() {

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currency, setCurrency] = useState('');
  const [countrySelected, setCountrySelected] = useState(false);
  const [states, setStates] = useState([]);
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [holePhoneNum, setHolePhoneNum] = useState('');
  const [algerianPhoneValid, setAlgerianPhoneValid] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [validePwd, setValidePwd] = useState(true);
  const [valideConfirmPassword, setValideConfirmPassword] = useState(true);

  const pwdRef = useRef(null);
  const currentPwdRef = useRef(null);
  const phoneNumRef = useRef(null);

  const enterPhoneNum = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhoneNum(input);
    if (selectedCountry.isoCode === 'DZ') {
      if (input.length === 9 && (input.startsWith('5') || input.startsWith('6') || input.startsWith('7'))) {
        setAlgerianPhoneValid(true);
        setHolePhoneNum(`+${phoneCode} ${input}`);
      }
    }
  };

  const handelCountryChange = (country) => {
    setSelectedCountry(country);
    setCountrySelected(true);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCurrency(country.currency || '');
    setPhoneCode(country.phonecode || '');
  }

  function handelConfirmPasswordChange(e) {
    setValideConfirmPassword(e === pwd);
    setConfirmPwd(e);
  }

  const handelPasswordChange = (e) => {
    const input = e.target.value;
    setValidePwd(input.length >= 8);
    setPwd(input);
  }

  useEffect(() => {
    setValideConfirmPassword(confirmPwd === pwd);
  }, [confirmPwd, pwd]);



  const checkFnameValidation = (e) => {
    const lettersOnly = e.replace(/[^a-zA-Z\s]/g, '');
    setFirstName(lettersOnly);
  }

  const checkLnameValidation = (e) => {
    const lettersOnly = e.replace(/[^a-zA-Z\s]/g, '');
    setLastName(lettersOnly);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!algerianPhoneValid) phoneNumRef.current.style.display = 'flex';
    if (algerianPhoneValid) phoneNumRef.current.style.display = 'none';
    if (!validePwd) pwdRef.current.style.display = 'flex';
    if (validePwd) pwdRef.current.style.display = 'none';
    if (!valideConfirmPassword) currentPwdRef.current.style.display = 'flex';
    if (valideConfirmPassword) currentPwdRef.current.style.display = 'none';
    if (validePwd && valideConfirmPassword && countrySelected && algerianPhoneValid) {
      alert('✅ Account created successfully!');
    } else {
      alert('⚠️ Please fix validation errors before submitting.');
    }
  };

  useEffect(() => { Aos.init({ duration: 1700 }) }, []);

  return (
    <div className='reg-container'>
      <div data-aos='zoom-in' className='register-page'>
        <h1>Welcome In Travel<h1>W</h1>Us</h1>
        <form className='register-form' onSubmit={handleSubmit}>
          <div className='first-sec'>
            <label>First Name
              <input
                value={firstName}
                onChange={(e) => checkFnameValidation(e.target.value)}
                type='text'
                placeholder='first name...'
                required
              />

            </label>
            <label>Last Name
              <input
                onChange={(e) => checkLnameValidation(e.target.value)}
                value={lastName}
                type='text'
                placeholder='last name...'
                required>
              </input>
            </label>
            <label>Email <input type='email' placeholder='email...' required></input></label>
            <label>Country
              <select
                required
                onChange={(e) => handelCountryChange(
                  countries.find((country) => country.isoCode === e.target.value)
                )}>
                <option value=''>Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                ))
                }
              </select>
            </label>
            <label>State
              <select
                required
                disabled={!countrySelected}
              >
                <option value=''>Select State</option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>{state.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className='separate-line'>
          </div>
          <div className='second-sec'>
            <label>Currency
              <select
                required
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}>
                <option value=''>Select Currency</option>
                {countries.map((ctr) => (
                  <option key={ctr.currency} value={ctr.currency}>{ctr.currency}</option>
                ))}
              </select>
            </label>
            <label className='phon'>Phone Number
              <div>
                <select
                  value={phoneCode}
                  disabled
                  className='phone-first-sec'
                >
                  <option value=''></option>
                  {countries.map((ctr) => (
                    <option key={ctr.phonecode} value={ctr.phonecode}>+ {ctr.phonecode}</option>
                  ))}
                </select>
                <input
                  placeholder='phone number...'
                  onChange={enterPhoneNum}
                  value={phoneNum}
                  type='tel'
                  className='phone-second-sec'
                  required
                >
                </input>
              </div>
              <span ref={phoneNumRef} className="error-msg">You must enter 9 digits begenning with either 5 or 6 or 7 !!!</span>
            </label>
            <label> Password
              <input
                value={pwd}
                type='password'
                onChange={handelPasswordChange}
                placeholder='password...'
                required></input>
              <p ref={pwdRef} className='error-msg'>You must enter At least 8 characters here !</p>
            </label>
            <label> Confirm Password
              <input
                value={confirmPwd}
                type='password'
                onChange={(e) => handelConfirmPasswordChange(e.target.value)}
                placeholder='Confirm password...'
                required></input>
              <p ref={currentPwdRef} className='error-msg'>You must enter the same password As before !</p>
            </label>
            <button>Create Acount</button>
          </div>
        </form>
      </div >
    </div >
  )
}
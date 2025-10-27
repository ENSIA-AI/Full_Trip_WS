import '../styles/register.css'
import { useState, useEffect } from 'react'
import { Country, State, City } from 'country-state-city'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Aos from 'aos'

export default function Register() {
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currency, setCurrency] = useState('');
  const [countrySelected, setCountrySelected] = useState(false);
  const [states, setStates] = useState([]);
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [FNvalide, setFNValide] = useState(true);
  const [lastName, setLastName] = useState('');
  const [LNvalide, setLNValide] = useState(true);

  console.log(countries);
  const handelCountryChange = (country) => {
    setSelectedCountry(country);
    setCountrySelected(true);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCurrency(country.currency || '');
    setPhoneCode(country.phonecode || '');
  }
  const enterPhoneNum = (e) => {
    const input = e.target.value;
    setPhoneNum(input);

    if (!selectedCountry) {
      setPhoneValid(false);
      return;
    }

    const fullNumber = `+${phoneCode}${input}`;
    const phoneNumber = parsePhoneNumberFromString(fullNumber, selectedCountry.isoCode);

    if (phoneNumber && phoneNumber.isValid()) {
      setPhoneValid(true);
      setPhoneNum(phoneNumber.formatInternational());
    } else {
      setPhoneValid(false);
    }
  };


  const checkFnameValidation = (e) => {
    const lettersOnly = e.replace(/[^a-zA-Z\s]/g, '');
    setFirstName(lettersOnly);
    setFNValide(lettersOnly.length >= 3);
  }
  const checkLnameValidation = (e) => {
    const lettersOnly = e.replace(/[^a-zA-Z\s]/g, '');
    setLastName(lettersOnly);
    setLNValide(lettersOnly.length >= 3);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (FNvalide && LNvalide && countrySelected && phoneValid) {
      alert('✅ Account created successfully!');
    } else {
      alert('⚠️ Please fix validation errors before submitting.');
    }
  };

  useEffect(() =>{ Aos.init({ duration: 1700 })}, []);

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
              {!FNvalide && (<span className='error-msg' >
                the first name must contain at least three letters
              </span>)}
            </label>
            <label>Last Name
              <input
                onChange={(e) => checkLnameValidation(e.target.value)}
                value={lastName}
                type='text'
                placeholder='last name...'
                required>
              </input>
              {!LNvalide && (<span className='error-msg'>
                the last name must contain at least three letters
              </span>)}
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
          </div>
          <div style={{
            width: "2px",
            height: "270px",
            backgroundColor: "black",
            margin: "0 10px"
          }}></div>
          <div className='second-sec'>
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
              {!phoneValid && <span className="error-msg">Invalid phone number</span>}
            </label>
            <button>Create Acount</button>
          </div>
        </form>
      </div >
    </div >
  )
}
import './css/header&signUp.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUpForm({ formAppearing, SetUserInfo, SetLoggedIn, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function goBack() { if(formAppearing) formAppearing(false); }

  async function submitForm(e) {
    e.preventDefault();
    setErrorMsg('');

    try {
      // ---------------------------------------------------------
      // REQUEST 2: LOGIN
      // ---------------------------------------------------------
      const response = await fetch('http://localhost/Full_Trip_WS/backend/Mohammed/REG/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // 1. SAVE USER ID (Crucial for Renting)
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('username', data.username);

        // 2. Update React State
        if(SetLoggedIn) SetLoggedIn(true);
        if(SetUserInfo) SetUserInfo({ UserName: data.username, UserType: data.role });

        alert("Login Successful!");

        // 3. Continue to Renting if a callback exists
        if (onLoginSuccess) {
            onLoginSuccess();
        } else {
            goBack();
        }
      } else {
        setErrorMsg(data.error || "Login failed");
      }
    } catch (err) {
      setErrorMsg("Connection Error");
    }
  }

  return (
    <div className="paymentform-overlay"> 
      <form className='submit-form' onSubmit={submitForm}>
        <button type="button" onClick={goBack} style={{float:'right'}}>X</button>
        <div className='sign-head'>Login</div>
        <Link to={'/register'}>Register here!</Link>
        
        <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
        
        {errorMsg && <p style={{color:'red'}}>{errorMsg}</p>}
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
}
export default SignUpForm;
import '../styles/header&signUp.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUpForm({ formAppearing, InContent }) {
  const [emailAppear, setEmailAppear] = useState(false);
  const emailFeedback = document.querySelector('.add-feedback form input');
  function submitForm() {
    setEmailAppear(true);
    InContent('Log In');
    formAppearing(false);
  }
  function goBack() {
    formAppearing(false);
  }
  emailFeedback.style.display = emailAppear ? 'flex' : 'none';

  return (
    <>
      <form
        class='submit-form'
        action={submitForm}>
        <button
          name='go-back'
          onClick={goBack}>
          <i class='bx  bx-x'  ></i>
        </button>
        <div
          className='sign-head'>
          Welcome - In
        </div>
        <p>If you are not registred yet ,you can click here to register:</p>
        <Link to={'/register'}>
          <a>
            register!
          </a>
        </Link>
        <label htmlFor='email' >email
          <input
            id='email'
            type='email'
            placeholder='Enter your email here ...'
            required /></label>
        <label htmlFor='password'>password
          <input
            id='paswd'
            type='password'
            placeholder='Please enter a password here...' required />
        </label>
        <button name='submit'>Confirm</button>
      </form>
    </>
  );
}

export default SignUpForm;
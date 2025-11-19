import '../styles/header&signUp.css'
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Users from '../../../Temp/TempUsers.json';

function SignUpForm({ formAppearing, InContent, SetUserInfo, SetLoggedIn }) {
  const [emailAppear, setEmailAppear] = useState(false);
  const emailFeedback = document.querySelector('.add-feedback form input');

  const emailInput = useRef();
  const PasswordInput = useRef();

  function submitForm() {

    const email = emailInput.current;
    const Password = PasswordInput.current;

    setEmailAppear(true);

    const UsersList = Users; // if imported as JSON
    console.log(UsersList);

    let found = false;

    for (const user of UsersList.users) {

      if (email.value === user.email  && Password.value === user.password ) {

        SetLoggedIn(true);
        SetUserInfo({ UserName: user.username, UserType: user.role });
        found = true;

        formAppearing(false);
        // break;

      }
    }

    if (!found) {
      alert("Wrong Email or Password");
    }
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
          Welcome
        </div>
        <label htmlFor='email' >Email
          <input
            ref={emailInput}
            id='email'
            type='email'
            placeholder='example@gmail.com'
            required /></label>
        <label htmlFor='password'>Password
          <input
            ref={PasswordInput}
            id='paswd'
            type='password'
            placeholder='Password' required />
        </label>
        <p>If you are not registred yet ,you can click here to register:</p>
        <a href='/register'>register!</a>
        <button name='submit'>Log In</button>
      </form>
    </>
  );
}

export default SignUpForm;
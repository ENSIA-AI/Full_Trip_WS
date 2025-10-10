import '../styles/header&signUp.css'
import React from 'react'
import titIcon from '../images/title-icon.svg'
import SignUpForm from './SignUpForm'

export default function Header() {
  const [formAppear, setFormAppear] = React.useState(false);
  let [btnContent, setBtnContent] = React.useState('Sign Up');
  const [navBarContent] = React.useState(['Stays', 'Flights', 'Car rental', 'Airport taxis', 'attractions']);
  const navContent = navBarContent.map(navContent => (
    <li key={navContent}>{navContent}</li>
  ))
  function showForm() {
    setFormAppear(true);
  }

  return (
    <>
      <header>
        <div className="slogo">
          <img src={titIcon}></img>
          <h1>TravelWUs</h1>
        </div>
        <ul className='navBar'>{navContent}</ul>
        <div className='SignLogIn'>
          <button onClick={showForm}>{btnContent}</button>
        </div>
      </header>
      {formAppear && <SignUpForm InContent={setBtnContent}
        formAppearing={setFormAppear} />}
    </>
  )
}
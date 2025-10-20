import '../styles/header&signUp.css'
import React from 'react'
import titIcon from '../images/title-icon.svg'
import SignUpForm from './SignUpForm'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function Header() {
  const [formAppear, setFormAppear] = React.useState(false);
  let [btnContent, setBtnContent] = React.useState('Sign Up');
  const [navBarContent] = React.useState(['Stays', 'Flights', 'Car rental', 'Airport taxis', 'attractions']);
  const navContent = navBarContent.map(navContent => (
    <li data-aos='zoom-in' tabindex="0" key={navContent}>{navContent}</li>
  ))

  function showForm() {
    setFormAppear(true);
  }

  
  React.useEffect(() => {
    Aos.init({ duration: 1700 })
  }, [])

  React.useEffect(() => {
    const home = document.querySelector('.main-page');
    const header = document.querySelector('header');
    if (formAppear) {

      if (home) home.classList.add('dimmed');
      if (header) header.classList.add('dimmed');

      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      home.classList.remove('dimmed');
      header.classList.remove('dimmed');
    }
  }, [formAppear]);


  return (
    <div className='header-div'>
      <header>
        <div data-aos='fade-right' className="slogo">
          <img src={titIcon}></img>
          <h1>TravelWUs</h1>
        </div>
        <ul className='navBar'>{navContent}</ul>
        <div data-aos='fade-left' className='SignLogIn'>
          <button onClick={showForm}>{btnContent}</button>
        </div>
      </header>
      {formAppear && <SignUpForm InContent={setBtnContent}
        formAppearing={setFormAppear} />}
    </div>
  )
}

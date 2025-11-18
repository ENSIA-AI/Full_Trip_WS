import '../styles/header&signUp.css'
import React, { useState } from 'react'
import titIcon from '../images/title-icon.svg'
import SignUpForm from './SignUpForm'

import UserProfile from '../../UserProfile/UserProfile'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'


export default function Header() {
  const [formAppear, setFormAppear] = React.useState(false);
  const [hiddenMenu, setHideMenu] = React.useState(true);
  const [LoggedIn, SetLoggedIn] = useState(true);

  const [navBarContent] = React.useState(['Stays', 'Flights', 'Airport taxis', 'attractions']);
  const navContent = navBarContent.map(navContent => (
    <li tabindex="0" key={navContent}>{navContent}</li>
  ))

  const hideMenu = () => {
    setHideMenu(true);
  }

  function showMenu() {
    setHideMenu(false);
  }

  function showForm() {
    setFormAppear(true);
  }

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
        <div className="slogo">
          <img src={titIcon}></img>
          <h1>TravelWUs</h1>
        </div>
        <ul
          id={hiddenMenu ? 'hideMin' : 'showMin'}
          className='navBar'>
          <li><button onClick={hideMenu} name='return'><i class='bx  bx-x'  ></i> </button></li>
          {navContent}</ul>
        <div className='SignLogIn'>

          {LoggedIn ?
            <Link to={"/Profile"} className='PrimrayB'><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></Link> :
            <button onClick={showForm}>Log In</button>
          }

        </div>
        <div className='menu'>
          <i
            class='bxr  bx-menu'
            onClick={showMenu}></i>
        </div>
      </header >
      {
        formAppear && <SignUpForm
          formAppearing={setFormAppear} />
      }
    </div >
  )
}

import '../styles/header&signUp.css'
import React, { useState } from 'react'
import titIcon from '../images/title-icon.svg'
import SignUpForm from './SignUpForm'
import { Route, Routes } from 'react-router-dom'

import Home from './HomePage'
import Explore from './Explore'
import AboutUs from './AboutUs'
import Feedback from './Feedback/Feedback'
import Footer from './Footer'
import Flights from '../../pages/Flights'
import Hotels from '../../pages/Hotels'
import FullTrip from '../../pages/FullTrip'
import CarRental from '../../moha-pages/pages/CarRental'
import Attraction from '../../moha-pages/pages/Attractions'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom'



export default function Header({ setUserInfo }) {
  const [formAppear, setFormAppear] = React.useState(false);
  const [hiddenMenu, setHideMenu] = React.useState(true);
  const [LoggedIn, SetLoggedIn] = useState(false);
  const [active, setActive] = useState('');



  const [navBarContent] = React.useState(['Home', 'Hotels', 'Flights', 'Car Rental', 'Attraction', 'Tours']);
  const navContent = navBarContent.map(navContent => (
    <NavLink
      to={`/${navContent}`}>
      <li
        className={active === navContent ? 'active' : ''}
        onClick={() => setActive(navContent)
        }
        key={navContent}>
        {navContent}</li>
    </NavLink>
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
      if (home) home.classList.remove('dimmed');
      if (header) header.classList.remove('dimmed');
    }
  }, [formAppear]);


  return (
    <>
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
              <Link to={"/Profile"} className='PrimrayB'><FontAwesomeIcon size='xl' icon={faUser}></FontAwesomeIcon></Link> :
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
            formAppearing={setFormAppear} SetLoggedIn={SetLoggedIn} SetUserInfo={setUserInfo} />
        }
      </div >

      <Routes>
        <Route path="Home" element={
          <>
            <Home />
            <Explore />
            <AboutUs />
            <Feedback />
            <Footer />
          </>
        } />
        <Route path="Flights" element={<Flights />} />
        <Route path="Car Rental" element={<CarRental />} />
        <Route path="Hotels" element={<Hotels />} />
        <Route path="Tours" element={<FullTrip />} />
        <Route path='Attraction' element={<Attraction />}></Route>
        <Route path='Car Rental' element={<CarRental />}></Route>
      </Routes>
    </>



  )
}

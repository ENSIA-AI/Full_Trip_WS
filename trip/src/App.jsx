import Header from './landingPage/components/Header'
import Home from './landingPage/components/HomePage'
import Explore from './landingPage/components/Explore'
import AboutUs from './landingPage/components/AboutUs'
import Feedback from './landingPage/components/Feedback/Feedback'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import UserProfile from './UserProfile/UserProfile'


{/* Testing will remove later*/ }


import Footer from './landingPage/components/Footer'
import Register from './landingPage/components/Register'
import { useState } from 'react'


function App() {

  const [UserInfo,setUserInfo]=useState({UserName:"Default",UserType:"Default"});
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <>
            <Header setUserInfo={setUserInfo}/>
            <Home />
            <Explore />
            <AboutUs />
            <Feedback />
            <Footer />
          </>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile/*" element={<UserProfile Username={UserInfo.UserName} U_type={UserInfo.UserType}/>} />
      </Routes>
    </BrowserRouter>
  )

}

export default App

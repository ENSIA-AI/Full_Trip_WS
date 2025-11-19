import Header from './landingPage/components/Header'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import UserProfile from './UserProfile/UserProfile'

import Register from './landingPage/components/Register'
import { useState } from 'react'

import Flights from './pages/Flights'
import Hotels from './pages/Hotels'
import FullTrip from './pages/FullTrip'
function App() {

  const [UserInfo,setUserInfo]=useState({UserName:"Default",UserType:"Default"});
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Header />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile/*" element={<UserProfile Username={UserInfo.UserName} U_type={UserInfo.UserType} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

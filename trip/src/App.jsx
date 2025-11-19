<<<<<<< Updated upstream
import Header from './landingPage/components/Header'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import UserProfile from './UserProfile/UserProfile'

import Register from './landingPage/components/Register'
import { useState } from 'react'
=======
import Attraction from "./moha-pages/pages/Attractions"

import CarRental from './moha-pages/pages/CarRental'
>>>>>>> Stashed changes

import Flights from './pages/Flights'
import Hotels from './pages/Hotels'
import FullTrip from './pages/FullTrip'
function App() {

  const [UserInfo,setUserInfo]=useState({UserName:"Default",UserType:"Default"});
  
  return (

<<<<<<< Updated upstream
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="Home" replace/>}></Route>
        <Route path="/*" element={<Header setUserInfo={setUserInfo} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile/*" element={<UserProfile Username={UserInfo.UserName} U_type={UserInfo.UserType} />} />
      </Routes>
    </BrowserRouter>
=======
    <CarRental></CarRental>
>>>>>>> Stashed changes
  )
}

export default App

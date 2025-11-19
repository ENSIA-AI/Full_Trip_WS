<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
import Header from './landingPage/components/Header'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import UserProfile from './UserProfile/UserProfile'

import Register from './landingPage/components/Register'
<<<<<<< Updated upstream
import CarRental from './moha-pages/pages/CarRental'
=======
import { useState } from 'react'
>>>>>>> Stashed changes

import CarRental from './moha-pages/pages/CarRental'
>>>>>>> Stashed changes

import CarRental from './moha-pages/pages/CarRental'
>>>>>>> Stashed changes

import CarRental from './moha-pages/pages/CarRental'
>>>>>>> Stashed changes

import CarRental from './moha-pages/pages/CarRental'
>>>>>>> Stashed changes

import Flights from './pages/Flights'
import Hotels from './pages/Hotels'
import FullTrip from './pages/FullTrip'
function App() {

  const [UserInfo,setUserInfo]=useState({UserName:"Default",UserType:"Default"});
  
  return (

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="Home" replace/>}></Route>
        <Route path="/*" element={<Header setUserInfo={setUserInfo} />} />
        <Route path="/register" element={<Register />} />
        <Route path='/carRental' element={<CarRental />}></Route>
        <Route path="/Profile/*" element={<UserProfile Username='Zoko' U_type='Regular'/>} />
      </Routes>
    </BrowserRouter>
=======
    <CarRental></CarRental>
>>>>>>> Stashed changes
=======
    <CarRental></CarRental>
>>>>>>> Stashed changes
=======
    <CarRental></CarRental>
>>>>>>> Stashed changes
=======
    <CarRental></CarRental>
>>>>>>> Stashed changes
  )
}

export default App

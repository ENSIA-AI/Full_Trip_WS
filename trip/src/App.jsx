

import Header from './landingPage/components/Header'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import UserProfile from './UserProfile/UserProfile'

import Register from './landingPage/components/Register'


import { useState } from 'react'





function App() {

  const [UserInfo,setUserInfo]=useState({UserName:"Default",UserType:"Agency"});
  
  return (

    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/Home" replace/>}></Route>
        <Route path="/*" element={<Header setUserInfo={setUserInfo} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile/*" element={<UserProfile Username='Zoko' U_type='Regular'/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

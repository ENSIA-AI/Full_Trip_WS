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


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <>
            <Header />
            <Home />
            <Explore />
            <AboutUs />
            <Feedback />
            <Footer />
          </>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile/*" element={<UserProfile Username='Zakaraya' U_type='Regular'/>} />
      </Routes>
    </BrowserRouter>
  )

}

export default App

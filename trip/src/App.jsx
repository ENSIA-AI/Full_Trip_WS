import Header from './landingPage/components/Header'
import Home from './landingPage/components/HomePage'
import Explore from './landingPage/components/Explore'
import AboutUs from './landingPage/components/AboutUs'
import Feedback from './landingPage/components/Feedback/Feedback'
import Footer from './landingPage/components/Footer'
import Register from './landingPage/components/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
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
      </Routes>
    </BrowserRouter>
  )
}

export default App

import Header from './landingPage/components/Header'
import Home from './landingPage/components/HomePage'
import Explore from './landingPage/components/Explore'
import AboutUs from './landingPage/components/AboutUs'
import Feedback from './landingPage/components/Feedback/Feedback'
import { BrowserRouter, Route ,Routes} from 'react-router-dom'

import UserProfile from './UserProfile/UserProfile'


{/* Testing will remove later*/ }



function App() {

  return (
    <>
      <BrowserRouter>
        {/* Testing Profile */}
        <Routes>
          <Route path='/*' element={<UserProfile U_type='Agency' Username='Travel W Us'/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App

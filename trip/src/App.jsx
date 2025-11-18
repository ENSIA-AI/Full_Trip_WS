import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Hotels from "./pages/Hotels";
import Flights from "./pages/Flights";
import FullTrip from "./pages/FullTrip";



function App() {
  return (
    <>
      <Navbar />
      
      <Routes>

        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/fulltrip" element={<FullTrip />} />

 
      </Routes>
    </>
  );
}

export default App;

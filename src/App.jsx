import { BrowserRouter, Routes, Route } from "react-router-dom";
import Click4Bid from "./Click4Bid";
import AboutUs from "./AboutUs";
import PropertyListings from "./PropertyListings";
import Login from "./Login";
import Register from "./Register";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Click4Bid />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/property-listing" element={<PropertyListings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;

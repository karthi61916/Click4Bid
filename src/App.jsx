import { BrowserRouter, Routes, Route } from "react-router-dom";

import Click4Bid from "./Click4Bid";
import AboutUs from "./AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Click4Bid />} />

        <Route path="/about" element={<AboutUs />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
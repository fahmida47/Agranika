import {  Routes, Route } from "react-router-dom";
import Home from "./Home";
import Sponsor from "./Sponsor";
import "./Ahona.css"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sponsor" element={<Sponsor />} />
      </Routes>
  );
}

export default App;
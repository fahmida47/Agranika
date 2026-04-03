import {  Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Sponsor from "./Sponsor";
import HomePage from "./hompage";
import "./navbar.css";
import "./Ahona.css"

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const hideNavbar = location.pathname === "/home" || location.pathname === "/sponsor";

  const handleNavbarSponsor = () => {
    sessionStorage.setItem("fromHome", "true");
    navigate("/home");
  };

  return (
    <>
      {!hideNavbar && (
        <header className="navbar">
        <div className="logo-box">
          <span className="logo">Agranika</span>
        </div>
        <div className="nav-menu">
          <Link to="/" style={{ textDecoration: "none" }}>
            <button type="button">HomePage</button>
          </Link>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <button type="button">Home</button>
          </Link>
          <Link to="/sponsor" style={{ textDecoration: "none" }}>
            <button type="button">Sponsor</button>
          </Link>
        </div>
        <div className="nav-right">
          <button className="sponsor-btn" type="button" onClick={handleNavbarSponsor}>Sponsor A Child</button>
        </div>
      </header>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
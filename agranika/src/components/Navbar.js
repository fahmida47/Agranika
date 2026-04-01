import React from "react";
import "./navbar.css";
import logo from "../assets1/Logo2.png";

function Navbar({ goHome, goMission }) {
  return (
    <header className="navbar">
      <div className="logo-box">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="nav-menu">
        <button onClick={goHome}>Home</button>
        <button onClick={goMission}>Mission</button>
        <button>Focus</button>
        <button>About Us</button>
        <button>Donate</button>
      </div>

      <div className="nav-right">
        <button className="sponsor-btn">Sponsor a Child</button>
      </div>
    </header>
  );
}

export default Navbar;
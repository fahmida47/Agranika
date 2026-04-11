import React, { useState } from "react";
import "./navbar.css";
import logo from "../assets1/Logo2.png";

function Navbar({ goHome, goMission, goTeam, goContact, goProfile }) {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  return (
    <header className="navbar">
      <div className="logo-box">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="nav-menu">
        <button onClick={goHome}>Home</button>
        <button onClick={goMission}>Mission</button>
        <button>Focus</button>

        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => setShowAboutDropdown(!showAboutDropdown)}
          >
            About Us <span className="arrow">{showAboutDropdown ? "▲" : "▼"}</span>
          </button>

          {showAboutDropdown && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={goContact}>
                Contact Us
              </button>
              <button className="dropdown-item" onClick={goTeam}>
                Our Agranika Team
              </button>
            </div>
          )}
        </div>

        <button>Donate</button>
        <button onClick={goProfile}>Profile</button>
      </div>

      <div className="nav-right">
        <button className="sponsor-btn">Sponsor a Child</button>
      </div>
    </header>
  );
}

export default Navbar;
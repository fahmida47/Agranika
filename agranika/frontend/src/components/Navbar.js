import React, { useState } from "react";
import "./navbar.css";
import logo from "../assets1/Logo2-removebg.png";

function Navbar({ goHome, goMission, goFocus, goTeam, goContact, goDonate, goSponsorPage, goAdmin,goProfile  }) {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin";

  return (
    <header className="navbar">
      <div className="logo-box">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="nav-menu">
        <button onClick={goHome}>Home</button>
        <button onClick={goMission}>Mission</button>
        <button onClick={goFocus}>Focus</button>
        
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

        <button onClick={goDonate}>Donate</button>
        <button onClick={goProfile}>Profile</button>

      
        {isAdmin && (
          <button className="admin-nav-btn" onClick={goAdmin} style={{ color: "#000000", fontWeight: "bold" }}>
            Dashboard ⚙️
          </button>
        )}
      </div>

      <div className="nav-right">
        <button className="sponsor-btn" onClick={goSponsorPage}>
          Sponsor a Child
        </button>
      </div>
    </header>
  );
}

export default Navbar;
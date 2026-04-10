import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Image/Logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="logo-box">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="nav-menu">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/mission")}>Mission</button>
        <button onClick={() => navigate("/focus")}>Focus</button>

        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => setShowAboutDropdown(!showAboutDropdown)}
          >
            About Us <span className="arrow">{showAboutDropdown ? "▲" : "▼"}</span>
          </button>

          {showAboutDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/contact")}>
                Contact Us
              </button>
              <button onClick={() => navigate("/team")}>
                Our Agranika Team
              </button>
            </div>
          )}
        </div>

        <button onClick={() => navigate("/donate")}>Donate</button>
      </div>

      <div className="nav-right">
        <button className="sponsor-btn" onClick={() => navigate("/sponsor")}>
          Sponsor a Child
        </button>
      </div>
    </header>
  );
}

export default Navbar;
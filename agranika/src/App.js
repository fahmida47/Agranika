import React from "react";
import "./App.css";

import logo from "./assets1/Logo2.png";
import heroImg from "./assets1/Home2.jpg";

function App() {
  return (
    <div className="page">
      <div className="main-box">
        <div className="navbar">
          <div className="logo-box">
            <img src={logo} alt="Logo" className="logo" />
          </div>

          <div className="nav-menu">
            <a href="/">Home</a>
            <a href="/">Mission</a>
            <a href="/">Focus</a>
            <a href="/">About Us</a>
            <a href="/">Donate</a>
          </div>

          <div className="nav-right">
            <span className="search-icon">&#128269;</span>
            <button className="sponsor-btn">Sponsor a Child</button>
          </div>
        </div>

        <div className="hero-section">
          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${heroImg})` }}
          ></div>

          <div className="hero-overlay"></div>

          

          <div className="headline-box">
            <h1>
              Leading Children
              <br />
              Toward
              <br />
              a Brighter
              <br />
              Future
            </h1>
          </div>

          <div className="right-gallery">
            <div
              className="gallery-card card-small"
              style={{ backgroundImage: `url(${heroImg})` }}
            ></div>

            <div
              className="gallery-card card-tall"
              style={{ backgroundImage: `url(${heroImg}) `}}
            ></div>

            <div
              className="gallery-card card-medium"
              style={{ backgroundImage: `url(${heroImg})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
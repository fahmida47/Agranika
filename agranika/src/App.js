import React from "react";
import "./App.css";

import logo from "./assets1/Logo2.png";
import heroImg from "./assets1/Home2.jpg";
import mission1 from "./assets1/mission1.webp";
import mission2 from "./assets1/mission2.jpeg";
import mission3 from "./assets1/mission3.jpg";

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
              style={{ backgroundImage: `url(${heroImg})` }}
            ></div>

            <div
              className="gallery-card card-medium"
              style={{ backgroundImage: `url(${heroImg})` }}
            ></div>
          </div>
        </div>

        <section className="mission-section">
          <h2>Our Mission</h2>

          <p className="mission-text">
            Our mission is to break the cycle of poverty by empowering orphaned
            and poor children through education, care, and long-term support.
          </p>

          <div className="mission-images">
            <img src={mission1} alt="Mission 1" />
            <img src={mission2} alt="Mission 2" />
            <img src={mission3} alt="Mission 3" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
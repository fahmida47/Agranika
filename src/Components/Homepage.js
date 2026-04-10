import React from "react";
import "./Homepage.css";
import heroImg from "../Image/Home2.jpg";

function HomePage() {
  return (
    <div className="main-box">
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
    </div>
  );
}

export default HomePage;
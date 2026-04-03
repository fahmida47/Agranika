import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import heroImg from "./Imagenew/Home2.jpg";

function HomePage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

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

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="button"
            className="sponsor-btn"
            onClick={goHome}
            style={{ cursor: "pointer" }}
          >
            Sponsor a Child (HomePage → Home)
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
import React from "react";
import "./mission.css";

// Assets location: src/assets1/mission1.jpg, mission2.jpg, mission3.jpg
import missionImg1 from "../assets1/mission1.webp";
import missionImg2 from "../assets1/mission2.jpeg";
import missionImg3 from "../assets1/mission3.jpg";

function Mission({ goHome }) {
  return (
    <div className="mission-section">
      <h2>Our Mission</h2>
      <p className="mission-text">
        We are committed to guiding children toward a brighter future by providing education, resources, and support.
      </p>
      <div className="mission-images">
        <img src={missionImg1} alt="Mission 1" />
        <img src={missionImg2} alt="Mission 2" />
        <img src={missionImg3} alt="Mission 3" />
      </div>
      <button className="back-btn" onClick={goHome}>
        Back to Home
      </button>
    </div>
  );
}

export default Mission;
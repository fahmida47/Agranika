import React, { useState } from "react";
import "./Focus.css";

import educationIcon from "../assets/Education.png";
import digitalIcon from "../assets/Digital-Learning.png";
import environmentIcon from "../assets/Environment.png";
import bg from "../assets/Focusbg.png";

const focusAreas = [
  { title: "Education", icon: <img src={educationIcon} alt="Education" />, summary: "Education is the core focus area of AGRANIKA.", pageKey: "education" },
  { title: "Digital Learning", icon: <img src={digitalIcon} alt="Digital Learning" />, summary: "Empowering children with Digital Skills.", pageKey: "digital" },
  { title: "Environment", icon: <img src={environmentIcon} alt="Environment" />, summary: "Creating awareness and action on Climate Change.", pageKey: "environment" },
];

const Focus = ({ goToPage }) => {
  const [selectedCard, setSelectedCard] = useState(null); // selected card

  const handleCardClick = (pageKey) => {
    setSelectedCard(pageKey); // change color
    goToPage(pageKey);        // navigate to subpage
  };

  return (
    <div className="focus-page">
      <div className="focus-header-box">
          <div className="focus-image">
    <img src={bg} alt="Focus Areas Banner" />
    <h1>Focus Areas</h1>
  </div>
      </div>
      <div className="focus-cards">
        {focusAreas.map((area, index) => (
          <div
            key={index}
            className={`focus-card fade-in ${selectedCard === area.pageKey ? "selected" : ""}`} // <-- add selected class
            onClick={() => handleCardClick(area.pageKey)}
          >
            <div className="icon">{area.icon}</div>
            <h3>{area.title}</h3>
            <p className="summary">{area.summary}</p>
            <button className="learn-btn">Learn More</button>
          </div>
        ))}
      </div>
    </div>
    
  );
};


export default Focus;
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/homepage";
import Mission from "./components/mission";

function App() {
  const goHome = () => {
    const homeSection = document.getElementById("home-section");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goMission = () => {
    const missionSection = document.getElementById("mission-section");
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar goHome={goHome} goMission={goMission} />

      <div id="home-section">
        <HomePage />
      </div>

      <div id="mission-section">
        <Mission />
      </div>
    </div>
  );
}

export default App;
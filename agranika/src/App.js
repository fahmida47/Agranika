import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/homepage";
import Mission from "./components/mission";
import TeamPage from "./components/TeamPage";
import VolunteerPage from "./components/VolunteerPage";
import Contact from "./components/Contact";
import Profile from "./components/Profile";

function App() {
  const [currentPage, setCurrentPage] = useState("main");

  const goHome = () => {
    setCurrentPage("main");

    setTimeout(() => {
      const homeSection = document.getElementById("home-section");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const goMission = () => {
    setCurrentPage("main");

    setTimeout(() => {
      const missionSection = document.getElementById("mission-section");
      if (missionSection) {
        missionSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const goTeam = () => {
    setCurrentPage("team");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goVolunteer = () => {
    setCurrentPage("volunteer");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goContact = () => {
    setCurrentPage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goProfile = () => {
    setCurrentPage("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-wrapper">
      <Navbar
        goHome={goHome}
        goMission={goMission}
        goTeam={goTeam}
        goContact={goContact}
        goProfile={goProfile}
      />

      {currentPage === "main" && (
        <>
          <div id="home-section">
            <HomePage />
          </div>

          <div id="mission-section">
            <Mission />
          </div>
        </>
      )}

      {currentPage === "team" && <TeamPage goVolunteer={goVolunteer} />}

      {currentPage === "volunteer" && <VolunteerPage />}

      {currentPage === "contact" && <Contact />}

      {currentPage === "profile" && <Profile />}
    </div>
  );
}

export default App;
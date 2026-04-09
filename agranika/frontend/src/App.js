import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/Sponsor.css";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/HomePage";
import Focus from "./components/Focus";
import { focusContent } from "./components/FocusContent";
import Mission from "./components/Mission";
import DonatePage from "./components/DonatePage";
import TeamPage from "./components/TeamPage";
import VolunteerPage from "./components/VolunteerPage";
import Sponsor from "./components/Sponsor";
import SponsorPage from "./components/SponsorPage";
import { SponsorProvider } from "./components/SponsorContext";



function App() {
  const [page, setPage] = useState("intro");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2500);
    const timer2 = setTimeout(() => setPage("login"), 3500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Pages that show navbar
  const showNavbar = [
    "home",
    "focus",
    "mission",
    "donate",
    "education",
    "digital",
    "environment",
    "team",
    "volunteer",
    "sponsorPage",
   
  ].includes(page);

  const goToPage = (pageKey) => setPage(pageKey);

  const protectedGoToPage = (pageKey) => {
    if (!localStorage.getItem("token")) {
      alert("Please login first to access this page.");
      setPage("login");
      return;
    }
    setPage(pageKey);
  };

  // Smooth scroll functions for main page sections
  const goHome = () => {
    setPage("home");
    setTimeout(() => {
      const homeSection = document.getElementById("home-section");
      if (homeSection) homeSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goMission = () => {
    setPage("home");
    setTimeout(() => {
      const missionSection = document.getElementById("mission-section");
      if (missionSection) missionSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goTeam = () => setPage("team");
  const goVolunteer = () => setPage("volunteer");
  const goContact = () => alert("Contact Us page will be added later");
  const goSponsorPage = () => protectedGoToPage("sponsorPage");
  const goSponsor = () => setPage("sponsor"); 
  

  return (
    <SponsorProvider>
    <div className="app-wrapper">
      {showNavbar && (
        <Navbar
          goHome={goHome}
          goMission={goMission}
          goFocus={() => setPage("focus")}
          goDonate={() => protectedGoToPage("donate")}
          goTeam={goTeam}
          goContact={goContact}
          goSponsorPage={goSponsorPage} 
        />
      )}

      {/* Intro/Login/Signup/Forgot */}
      {page === "intro" && <Intro fadeOut={fadeOut} />}
      {page === "login" && (
        <Login
          toggleSignup={() => setPage("signup")}
          goForgot={() => setPage("forgot")}
          goHome={goHome}
        />
      )}
      {page === "signup" && <Signup toggleLogin={() => setPage("login")} />}
      {page === "forgot" && <ForgotPassword toggleLogin={() => setPage("login")} />}

      {/* Home / Mission sections */}
      {page === "home" && (
        <>
          <div id="home-section">
            <HomePage goMission={goMission} goFocus={() => setPage("focus")} goDonate={() => protectedGoToPage("donate")} />
          </div>

          <div id="mission-section">
            <Mission goHome={goHome} goLogin={() => setPage("login")} />
          </div>
        </>
      )}

      {/* Focus page */}
      {page === "focus" && <Focus goToPage={goToPage} />}

      {/* Donate page */}
      {page === "donate" && <DonatePage goHome={goHome} />}

      {/* Team and Volunteer pages */}
      {page === "team" && <TeamPage goVolunteer={goVolunteer} />}
      {page === "volunteer" && <VolunteerPage />}

      {/* Dynamic Focus Subpages */}
      {["education", "digital", "environment"].includes(page) && (
        <div className="subpage">
          <h1>{focusContent[page].title}</h1>
          <div className="subpage-content">
            <img src={focusContent[page].img} alt={focusContent[page].title} className="subpage-img" />
            <p>{focusContent[page].text}</p>
          </div>
        </div>
      )}
      {/* Sponsor Pages */}
        {page === "sponsorPage" && <SponsorPage goSponsor={goSponsor} />}
        {page === "sponsor" && <Sponsor />}
    </div>
    </SponsorProvider>
  );
}

export default App;

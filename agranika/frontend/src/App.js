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
import Contact from "./components/Contact";
import Sponsor from "./components/Sponsor";
import SponsorPage from "./components/SponsorPage";
import { SponsorProvider } from "./components/SponsorContext";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import CarbonFootprintDisplay from "./components/CarbonFootprint";

function App() {
  const getInitialPage = () => {
    const path = window.location.pathname.replace("/", "");
    return path || "intro";
  };

  const [page, setPage] = useState(getInitialPage);
  const [fadeOut, setFadeOut] = useState(false);

  
  const navigateTo = (pageKey) => {
    setPage(pageKey);
    const newPath = pageKey === "intro" ? "/" : `/${pageKey}`;
    
 
    if (pageKey === "login" || pageKey === "signup") {
      window.history.pushState({ page: pageKey }, "", newPath);
    } else {
      
      window.history.replaceState({ page: pageKey }, "", newPath);
    }
  };


  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setPage(event.state.page);
      } else {
        
        setPage("intro");
      }
    };

    window.addEventListener("popstate", handlePopState);
    
   
    if (!window.history.state) {
      window.history.replaceState({ page: "intro" }, "", "/");
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []); 

 
  useEffect(() => {
    if (page === "intro") {
      const timer1 = setTimeout(() => setFadeOut(true), 2500);
      const timer2 = setTimeout(() => {
        setPage("login");
        
        window.history.replaceState({ page: "intro" }, "", "/");
        window.history.pushState({ page: "login" }, "", "/login");
      }, 3500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [page]);

 
  const showNavbar = [
    "home", "focus", "mission", "donate", "education", "digital",
    "environment", "team", "volunteer", "contact", "sponsorPage",
    "sponsor", "admin", "profile"
  ].includes(page);

  const goToPage = (pageKey) => navigateTo(pageKey);

  const protectedGoToPage = (pageKey) => {
    if (!localStorage.getItem("token")) {
      alert("Please login first to access this page.");
      navigateTo("login");
      return;
    }
    navigateTo(pageKey);
  };

  const adminGoToPage = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); 

    if (!token || user?.role !== "admin") {
      alert("Access Denied! Admins Only.");
      navigateTo("home");
      return;
    }
    navigateTo("admin");
  };

  const goHome = () => {
    navigateTo("home");
    setTimeout(() => {
      const homeSection = document.getElementById("home-section");
      if (homeSection) homeSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goMission = () => {
    navigateTo("home");
    setTimeout(() => {
      const missionSection = document.getElementById("mission-section");
      if (missionSection) missionSection.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goTeam = () => navigateTo("team");
  const goVolunteer = () => navigateTo("volunteer");
  const goContact = () => navigateTo("contact");
  const goSponsorPage = () => protectedGoToPage("sponsorPage");
  const goSponsor = () => navigateTo("sponsor"); 
  const goAdmin = () => adminGoToPage(); 
  const goProfile = () => protectedGoToPage("profile");

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5004/api/auth/logout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include" 
      });
    } catch (error) {
      console.error("Backend logout failed:", error);
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    navigateTo("login"); 
  };

  return (
    <SponsorProvider>
      <div className="app-wrapper">
        {showNavbar && (
          <Navbar
            goHome={goHome}
            goMission={goMission}
            goFocus={() => navigateTo("focus")}
            goDonate={() => protectedGoToPage("donate")}
            goTeam={goTeam}
            goContact={goContact}
            goSponsorPage={goSponsorPage} 
            goSponsor={goSponsor}
            goAdmin={goAdmin}
            goProfile={goProfile}
            goLogin={handleLogout}
          />
        )}

        {page === "intro" && <Intro fadeOut={fadeOut} />}
        {page === "login" && (
          <Login
            toggleSignup={() => navigateTo("signup")}
            goForgot={() => navigateTo("forgot")}
            goHome={goHome}
          />
        )}
        {page === "signup" && <Signup toggleLogin={() => navigateTo("login")} />}
        {page === "forgot" && <ForgotPassword toggleLogin={() => navigateTo("login")} />}

        {page === "home" && (
          <>
            <div id="home-section">
              <HomePage goMission={goMission} goFocus={() => navigateTo("focus")} goDonate={() => protectedGoToPage("donate")} />
            </div>
            <div id="mission-section">
              <Mission goHome={goHome} goLogin={() => navigateTo("login")} />
            </div>
          </>
        )}

        {page === "focus" && <Focus goToPage={goToPage} />}
        {page === "donate" && <DonatePage goHome={goHome} />}
        {page === "team" && <TeamPage goVolunteer={goVolunteer} />}
        {page === "volunteer" && <VolunteerPage />}
        {page === "contact" && <Contact />}
        {page === "admin" && <AdminDashboard />}
        {page === "profile" && <Profile goSponsor={() => navigateTo("sponsor")} />}
        {["education", "digital", "environment"].includes(page) && (
  <div className="focus-detail-page fade-in">
    

    <div className="subpage-content">
      <div className="detail-image-box">
        {/* এখানে Optional Chaining (?) দিন */}
        <img src={focusContent[page]?.img} alt={focusContent[page]?.title} className="subpage-img" />
      </div>

      <div className="detail-text-box">
        <h2>{focusContent[page]?.title}</h2>
        <p className="detail-desc">{focusContent[page]?.text}</p>

        <div className="detail-points">
          {/* এই লাইনটিই এরর দিচ্ছে, এখানে optional chaining ব্যবহার করুন */}
          {focusContent[page]?.points?.map((p) => (
            <div key={p.id} className="detail-point-item">
              <span className="point-number">{p.id}</span>
              <div className="point-text-content">
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
        
        {page === "sponsorPage" && <SponsorPage goSponsor={goSponsor} />}
        {page === "sponsor" && <Sponsor />}

        <CarbonFootprintDisplay />
      </div>
    </SponsorProvider>
  );
}

export default App;

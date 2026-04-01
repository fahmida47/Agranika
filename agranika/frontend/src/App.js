import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/HomePage";
import Focus from "./components/Focus";
import Mission from "./components/Mission";
import DonatePage from "./components/DonatePage"; 

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

  // Pages where Navbar should be visible
  const showNavbar = ["home", "focus", "mission", "donate"].includes(page);

  return (
    <div>
      {/* Show Navbar only on these pages */}
      {showNavbar && (
        <Navbar
          goHome={() => setPage("home")}
          goMission={() => setPage("mission")}
          goFocus={() => setPage("focus")}
          goDonate={() => setPage("donate")}
          goLogin={() => setPage("login")}
        />
      )}

      {page === "intro" && <Intro fadeOut={fadeOut} />}
      {page === "login" && (
        <Login
          toggleSignup={() => setPage("signup")}
          goForgot={() => setPage("forgot")}
          goHome={() => setPage("home")}
        />
      )}
      {page === "signup" && <Signup toggleLogin={() => setPage("login")} />}
      {page === "forgot" && (
        <ForgotPassword toggleLogin={() => setPage("login")} />
      )}
      {page === "home" && (
        <HomePage 
          goMission={() => setPage("mission")}
          goFocus={() => setPage("focus")}
          goDonate={() => setPage("donate")}
        />
      )}
      {page === "focus" && (
        <Focus
          goHome={() => setPage("home")}
          goMission={() => setPage("mission")}
        />
      )}
      {page === "mission" && (
        <Mission
          goHome={() => setPage("home")}
          goLogin={() => setPage("login")}
        />
      )}
      {page === "donate" && (
        <DonatePage goHome={() => setPage("home")} />
      )}
    </div>
  );
}

export default App;
/*import React, { useState, useEffect } from "react";
import Intro from "./components/Intro";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/HomePage";
import Mission from "./components/Mission";

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

  return (
    <div>
      {page === "intro" && <Intro fadeOut={fadeOut} />}
      {page === "login" && (
        <Login
          toggleSignup={() => setPage("signup")}
          goForgot={() => setPage("forgot")}
          goHome={() => setPage("home")}
        />
      )}
      {page === "signup" && <Signup toggleLogin={() => setPage("login")} />}
      {page === "forgot" && (
        <ForgotPassword toggleLogin={() => setPage("login")} />
      )}
      {page === "home" && <HomePage goMission={() => setPage("mission")} />}
      {page === "mission" && (
        <Mission
          goHome={() => setPage("home")}
          goLogin={() => setPage("login")}
        />
      )}
    </div>
  );
}

export default App;*/

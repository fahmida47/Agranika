import React, { useState, useEffect } from "react";
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

export default App;

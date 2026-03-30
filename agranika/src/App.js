import React, { useState, useEffect } from "react";
import Intro from "./Components/Intro";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import HomePage from "./Components/HomePage";
import Mission from "./Components/Mission";

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
      {page === "forgot" && <ForgotPassword toggleLogin={() => setPage("login")} />}
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
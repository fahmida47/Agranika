import React, { useState, useEffect } from "react";
import Intro from "./Components/Intro";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2500); // fade out intro
    const timer2 = setTimeout(() => setShowLogin(true), 3500); // show login
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleToggle = () => {
    setShowLogin(!showLogin);
    setShowSignup(!showSignup);
  };

  return (
    <div>
      {!showLogin && !showSignup ? (
        <Intro fadeOut={fadeOut} />
      ) : showLogin ? (
        <Login toggleSignup={handleToggle} />
      ) : (
        <Signup toggleLogin={handleToggle} />
      )}
    </div>
  );
}

export default App;
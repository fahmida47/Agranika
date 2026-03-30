import React, { useRef } from "react";
import HomePage from "./components/homepage";
import Mission from "./components/mission";
import "./App.css";

function App() {
  const homeRef = useRef(null);
  const missionRef = useRef(null);

  const goMission = () => {
    missionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    homeRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page">
      <div ref={homeRef}>
        <HomePage goMission={goMission} />
      </div>

      <div ref={missionRef}>
        <Mission goHome={goHome} />
      </div>
    </div>
  );
}

export default App;
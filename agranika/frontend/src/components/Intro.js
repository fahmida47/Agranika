import React from "react";
import "./Intro.css";
import bg from "../assets/IntroImage.png"; 

const Intro = ({ fadeOut }) => {
  return (
    <div
      className={`intro-container ${fadeOut ? "fade-out" : ""}`}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="animated-text">WELCOME</h1>
    </div>
  );
};

export default Intro;
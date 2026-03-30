import React from "react";
import "./Logo.css";
import logoImg from "../assets/Logo.png"; // Replace with your logo path

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={Logo} alt="Agranika Logo" className="Logo" />
      <span className="logo-text">Agranika</span>
    </div>
  );
};

export default Logo;
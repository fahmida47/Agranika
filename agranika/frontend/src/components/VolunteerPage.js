import React, { useState } from "react";
import "./volunteerpage.css";
import VolunteerForm from "./VolunteerForm";

function VolunteerPage() {
  const [copiedNumber, setCopiedNumber] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCopy = async (number) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);

      setTimeout(() => {
        setCopiedNumber("");
      }, 2000);
    } catch (error) {
      console.log("Copy failed", error);
    }
  };

  const handleJoinUsClick = () => {
    setShowForm(true);
  };

  return (
    <div className="volunteer-page">
      <div className="volunteer-content">
        <h1 className="volunteer-title">
          <span>Volunteer</span> Team
        </h1>

        <p className="volunteer-text">
          Our volunteer team is an important part of Agranika Foundation.
          They work with care, kindness, and dedication to support
          underprivileged children through education. Their effort helps
          create hope, confidence, and learning opportunities for children
          who need support the most.
        </p>

        <div className="volunteer-members">
          <div className="volunteer-card">
            <div className="volunteer-icon">👤</div>
            <h3>Ahona Zabin</h3>
            <h4>Teaching Support Volunteer</h4>
            <p>
              Helps children with basic learning activities, reading practice,
              and classroom support.
            </p>

            <button
              className="volunteer-contact"
              onClick={() => handleCopy("01400752656")}
            >
              {copiedNumber === "01400752656"
                ? "Copied!"
                : "Contact: 01400752656"}
            </button>
          </div>

          <div className="volunteer-card">
            <div className="volunteer-icon">👤</div>
            <h3>Afifa Faija</h3>
            <h4>Program Coordination Volunteer</h4>
            <p>
              Supports educational programs, organizes activities, and helps
              manage student engagement.
            </p>

            <button
              className="volunteer-contact"
              onClick={() => handleCopy("01535708774")}
            >
              {copiedNumber === "01535708774"
                ? "Copied!"
                : "Contact: 01535708774"}
            </button>
          </div>

          <div className="volunteer-card">
            <div className="volunteer-icon">👤</div>
            <h3>Fahmida Nadia</h3>
            <h4>Child Guidance Volunteer</h4>
            <p>
              Provides guidance, motivation, and care to children while helping
              with different learning sessions.
            </p>

            <button
              className="volunteer-contact"
              onClick={() => handleCopy("01885513636")}
            >
              {copiedNumber === "01885513636"
                ? "Copied!"
                : "Contact: 01885513636"}
            </button>
          </div>
        </div>

        <div className="join-us-wrapper">
          <button className="join-us-btn" onClick={handleJoinUsClick}>
            Join Us
          </button>
        </div>

        {showForm && <VolunteerForm />}
      </div>
    </div>
  );
}

export default VolunteerPage;
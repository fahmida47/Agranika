import React from "react";
import "./teampage.css";
import teamBanner from "../assets1/team-banner.jpeg";

function TeamPage({ goVolunteer }) {
  return (
    <div className="team-page">
      <div className="team-hero">
        <img src={teamBanner} alt="Agranika Team" className="team-hero-img" />
      </div>

      <div className="team-content">
        <h1 className="team-title">
          <span>Agranika</span> Team
        </h1>

        <p className="team-text">
          At the heart of Agranika Foundation is a dedicated and caring team
          working together to support underprivileged children through
          education. Our foundation believes that every child deserves the
          opportunity to learn, grow, and build a brighter future.
        </p>

        <p className="team-text">
          The Agranika team is made up of passionate individuals who share one
          common goal: helping children from low-income backgrounds receive
          quality education, guidance, and hope for a better life. We work with
          compassion, responsibility, and teamwork to create a positive impact
          in the lives of children and their families.
        </p>

        <div className="team-box-wrapper single-box">
          <div className="team-box" onClick={goVolunteer}>
            Volunteer Team
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
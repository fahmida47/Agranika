import React, { useState } from "react";
import "./mission.css";
import missionImg1 from "../assets1/mission1.webp";
import missionImg2 from "../assets1/mission2.jpeg";
import missionImg3 from "../assets1/mission3.jpg";

function Mission() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleReadMore = (cardNumber) => {
    if (expandedCard === cardNumber) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardNumber);
    }
  };

  return (
    <div className="mission-section">
      <h2>Our Mission</h2>
      <p className="mission-intro">
        We are committed to guiding children toward a brighter future through
        education, care, support, and opportunities that help them grow with
        confidence and hope.
      </p>

      <div className="mission-cards">
        <div className="mission-card">
          <img
            src={missionImg1}
            alt="Education support"
            className="mission-card-img"
          />

          <div className="mission-card-content">
            <div className="mission-tag">Education Support</div>

            <div className="mission-title-row">
              <h3>Building Brighter Futures Through Learning</h3>
            </div>

            <p>
              We help children continue their studies by supporting access to
              books, school supplies, and a caring learning environment.
            </p>

            {expandedCard === 1 && (
              <p className="extra-text">
                Our mission is to make education more reachable for children who
                face social and economic barriers. We believe every child
                deserves a chance to learn, dream, and move toward a better
                future. Through continued support, children can grow in
                confidence, improve their skills, and stay motivated in school.
              </p>
            )}

            <button
              className="read-more-btn"
              onClick={() => toggleReadMore(1)}
            >
              {expandedCard === 1 ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

        <div className="mission-card">
          <img
            src={missionImg2}
            alt="Skills development"
            className="mission-card-img"
          />

          <div className="mission-card-content">
            <div className="mission-tag">Skills Development</div>

            <div className="mission-title-row">
              <h3>Creating Opportunities for Growth and Confidence</h3>
            </div>

            <p>
              We encourage children and youth to build practical skills,
              confidence, and creativity for a more meaningful future.
            </p>

            {expandedCard === 2 && (
              <p className="extra-text">
                Beyond academics, we focus on helping children discover their
                abilities and strengthen their confidence. With guidance,
                digital exposure, and supportive learning experiences, they can
                develop skills that prepare them for new opportunities and
                personal growth in everyday life.
              </p>
            )}

            <button
              className="read-more-btn"
              onClick={() => toggleReadMore(2)}
            >
              {expandedCard === 2 ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

        <div className="mission-card">
          <img
            src={missionImg3}
            alt="Community care"
            className="mission-card-img"
          />

          <div className="mission-card-content">
            <div className="mission-tag">Community Care</div>

            <div className="mission-title-row">
              <h3>Supporting Children with Care and Inclusion</h3>
            </div>

            <p>
              We work to create a safe and caring environment where every child
              feels valued, supported, and inspired.
            </p>

            {expandedCard === 3 && (
              <p className="extra-text">
                We believe children grow best when they feel respected,
                protected, and included in their community. By working with
                families and local support systems, we aim to build a stronger
                environment where children can feel secure, connected, and ready
                to move forward with hope.
              </p>
            )}

            <button
              className="read-more-btn"
              onClick={() => toggleReadMore(3)}
            >
              {expandedCard === 3 ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mission;
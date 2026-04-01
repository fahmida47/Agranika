import React, { useState } from "react";
import "./Focus.css";

const focusAreas = [
  {
    title: "Education",
    summary: "Education is the core focus area of JAAGO.",
    details: `Education is the core focus area of JAAGO. For 17 years, JAAGO has been working to make education accessible to children from marginalized communities and hard-to-reach areas. We focus on quality education, teacher training, child-friendly learning environments, inclusive classrooms, extracurricular activities, and literacy programs. Our goal is to empower every child to reach their full potential.`
  },
  {
    title: "Digital Learning",
    summary: "Empowering children with digital skills.",
    details: `JAAGO introduces interactive digital learning programs, online resources, and technology-driven classrooms. Children learn coding, digital literacy, problem-solving, and online collaboration tools. These programs bridge the digital divide and prepare students for modern careers, ensuring access to technology for all children.`
  },
  {
    title: "Environment",
    summary: "Creating awareness and action on climate change.",
    details: `From global warming to environmental pollution, JAAGO encourages youth participation in protecting the planet. We run campaigns, workshops, tree planting initiatives, clean-up drives, and climate education programs. Our goal is to create responsible global citizens who contribute to a sustainable future.`
  },
];

const Focus = ({ goHome }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="focus-page">
      {/* Highlighted heading box */}
      <div className="focus-header-box">
  <h1>Our Focus Areas</h1>
</div>

<div className="focus-cards">
  {focusAreas.map((area, index) => {
    const isExpanded = expandedIndex === index;
    return (
      <div key={index} className={`focus-card ${isExpanded ? "expanded" : ""}`}>
        <h2>{area.title}</h2>
        <p>{area.summary}</p>
        <div className="details-container" style={{ maxHeight: isExpanded ? "500px" : "0" }}>
          <p className="details">{area.details}</p>
        </div>
        <button className="learn-btn" onClick={() => toggleDetails(index)}>
          {isExpanded ? "Show Less" : "Learn More"}
        </button>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default Focus;
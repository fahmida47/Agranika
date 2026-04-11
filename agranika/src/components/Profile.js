import React, { useState } from "react";
import "./Profile.css";
import coverImage from "../assets1/child-cover.jpeg";

function Profile() {
  const [searchAge, setSearchAge] = useState("");

  const childrenProfiles = [
    { id: 1, name: "Amina", age: 11, className: "Class 5", gender: "Female" },
    { id: 2, name: "Rahim", age: 8, className: "Class 2", gender: "Male" },
    { id: 3, name: "Sumaiya", age: 12, className: "Class 6", gender: "Female" },
    { id: 4, name: "Karim", age: 10, className: "Class 4", gender: "Male" },
    { id: 5, name: "Nusrat", age: 11, className: "Class 5", gender: "Female" },
    { id: 6, name: "Hasan", age: 12, className: "Class 6", gender: "Male" },
    { id: 7, name: "Mim", age: 8, className: "Class 2", gender: "Female" },
    { id: 8, name: "Sabbir", age: 10, className: "Class 4", gender: "Male" },
    { id: 9, name: "Tania", age: 12, className: "Class 6", gender: "Female" },
    { id: 10, name: "Jony", age: 11, className: "Class 5", gender: "Male" },
    { id: 11, name: "Priya", age: 13, className: "Class 7", gender: "Female" },
    { id: 12, name: "Rakib", age: 12, className: "Class 6", gender: "Male" },
    { id: 13, name: "Lamia", age: 8, className: "Class 2", gender: "Female" },
    { id: 14, name: "Rifat", age: 11, className: "Class 5", gender: "Male" },
    { id: 15, name: "Sadia", age: 12, className: "Class 6", gender: "Female" },
    { id: 16, name: "Nabil", age: 9, className: "Class 3", gender: "Male" },
    { id: 17, name: "Mahi", age: 7, className: "Class 1", gender: "Female" },
    { id: 18, name: "Omar", age: 6, className: "Class KG", gender: "Male" },
    { id: 19, name: "Tuba", age: 14, className: "Class 8", gender: "Female" },
    { id: 20, name: "Farhan", age: 15, className: "Class 9", gender: "Male" }
  ];

  const filteredProfiles = childrenProfiles.filter((child) => {
    if (searchAge === "") return true;
    return child.age.toString() === searchAge;
  });

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-hero-image">
          <img src={coverImage} alt="Child cover" />
        </div>

        <div className="profile-hero-text">
          <span className="quote-badge">Agranika Foundation</span>
          <h1>Every child deserves a beautiful future</h1>
          <p>
            “A child’s smile carries the hope of tomorrow. With care, love,
            and education, we can help every dream grow.”
          </p>
        </div>
      </div>

      <h1 className="profile-title">Children Profiles</h1>
      <p className="profile-subtitle">
        Here are the profiles of children supported by Agranika Foundation.
      </p>

      <div className="search-box-wrapper">
        <input
          type="number"
          placeholder="Search by age"
          value={searchAge}
          onChange={(e) => setSearchAge(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="result-count">
        Showing {filteredProfiles.length} profile
        {filteredProfiles.length !== 1 ? "s" : ""}
      </div>

      <div className="profile-grid">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((child) => (
            <div className="profile-card" key={child.id}>
              <div className="profile-circle">{child.name.charAt(0)}</div>
              <h2>{child.name}</h2>
              <p><strong>Age:</strong> {child.age}</p>
              <p><strong>Class:</strong> {child.className}</p>
              <p><strong>Gender:</strong> {child.gender}</p>
            </div>
          ))
        ) : (
          <p className="no-result">No child found for this age.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
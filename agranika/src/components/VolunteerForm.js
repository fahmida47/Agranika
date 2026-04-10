import React, { useState } from "react";
import "./VolunteerForm.css";

function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    interest: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Volunteer form submitted successfully!");
    console.log(formData);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      age: "",
      address: "",
      interest: "",
      message: "",
    });
  };

  return (
    <div className="volunteer-form-section">
      <h2 className="form-title">Join Our Volunteer Team</h2>
      <p className="form-subtitle">
        Fill up the form below if you want to work with Agranika Foundation.
      </p>

      <form className="volunteer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        <div className="form-group">
          <label>Area of Interest</label>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            required
          >
            <option value="">Select one</option>
            <option value="Teaching Support">Teaching Support</option>
            <option value="Program Coordination">Program Coordination</option>
            <option value="Child Guidance">Child Guidance</option>
            <option value="Event Support">Event Support</option>
          </select>
        </div>

        <div className="form-group">
          <label>Why do you want to join?</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            rows="5"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Form
        </button>
      </form>
    </div>
  );
}

export default VolunteerForm;
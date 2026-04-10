import React, { useState, useEffect } from "react";
import "./VolunteerForm.css";

const VolunteerForm = ({ goLogin }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    address: "",
    interest: "",
    message: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to access the Volunteer Application!");
      if (goLogin) goLogin();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [goLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please login first!");
      if (goLogin) goLogin();
      setLoading(false);
      return;
    }

   
    if (!formData.fullName || !formData.phone || !formData.age || !formData.interest) {
      alert("Please fill all required fields!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5004/api/volunteer/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age) 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Application submitted successfully! ❤️");
        // ফর্ম রিসেট
        setFormData({
          fullName: "",
          phone: "",
          age: "",
          address: "",
          interest: "",
          message: "",
        });
      } else {
        alert("❌ " + (data.message || "Something went wrong"));
        if (res.status === 401 && goLogin) goLogin();
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

        <button type="submit" className="submit-btn" disabled={loading}>
          Submit Form
        </button>
      </form>
    </div>
  );
}

export default VolunteerForm;
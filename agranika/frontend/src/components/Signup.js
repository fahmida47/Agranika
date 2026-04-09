import React, { useState } from "react";
import "./Signup.css";
import bg from "../images/1stbg.jpg.jpeg";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5004/api";

function Signup({ toggleLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing up...");

    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookie support
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Signup successful! Redirecting to login...");
        
        // Store token if backend returns it
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setFormData({
          name: "",
          phone: "",
          email: "",
          password: ""
        });

        setTimeout(() => {
          toggleLogin();
        }, 1500);
      } else {
        setMessage(data.message || "❌ Signup failed");
      }
    } catch (error) {
      setMessage("❌ Network error: " + error.message);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="signup-box">
        <div className="signup-header">
          <h1>SIGN UP</h1>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone no"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">SIGN UP</button>

          {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}

          <p className="login-text">
            Already have an account?{" "}
            <span className="login-link" onClick={toggleLogin}>
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
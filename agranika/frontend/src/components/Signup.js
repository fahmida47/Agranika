import React, { useState, useEffect } from "react";
import "./Signup.css";

import img1 from "../assets/image_0.jpg";
import img2 from "../assets/image_1.jpg"; 
import img3 from "../assets/image_2.jpg";
import img4 from "../assets/image_3.jpg";
import img5 from "../assets/image_4.jpg";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5004/api";

function Signup({ toggleLogin }) {
  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", password: ""
  });

  const [message, setMessage] = useState("");


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating account...");
    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ ...formData, role: "user" }) 
        
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Signup successful!");
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setFormData({
          name: "",
          phone: "",
          email: "",
          password: ""
        });
        setTimeout(() => toggleLogin(), 1500);
      } else {
        setMessage(data.message || "❌ Signup failed");
      }
    } catch (error) {
      setMessage("❌ Network error: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        
       
        <div className="form-side">
          <div className="form-wrapper">
            <h1>CREATE ACCOUNT</h1>
            <p>Join our community today</p>
            
            <form className="signup-form" onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              
              <button type="submit" className="submit-btn">
                SIGN UP
              </button>
            </form>

            {message && <p className="msg">{message}</p>}
            
            <p className="login-link">
              Already have an account? <span onClick={toggleLogin}>Log In</span>
            </p>
          </div>
        </div>

       
        <div className="image-side">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="slide"
              className={index === currentImageIndex ? "active" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Signup;
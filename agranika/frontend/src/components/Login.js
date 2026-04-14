import React, { useState, useEffect } from "react";
import "./Login.css";

// ইমেজগুলো ইমপোর্ট করুন
import img1 from "../assets/image_0.jpg";
import img2 from "../assets/image_1.jpg"; 
import img3 from "../assets/image_2.jpg";
import img4 from "../assets/image_3.jpg";
import img5 from "../assets/image_4.jpg";

function Login({ toggleSignup, goForgot, goHome }) {
  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setMessage("Verifying...");
    
     try {
      const response = await fetch("http://localhost:5004/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token || ""); 
        localStorage.setItem("user", JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role 
        }));

        setTimeout(() => {
          goHome();
        }, 1000);
      } else {
        setMessage(data.message || "❌ Login failed");
      }
    } catch (error) {
      setMessage("❌ Network error: " + error.message);
    }
};

 

  return (
    <div className="unique-login-container">
     
      <div className="login-image-section">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="slide"
            className={index === currentImageIndex ? "active" : ""}
          />
        ))}
        <div className="image-overlay-text">
          <h2>Welcome Back!</h2>
          <p>Please enter your details to stay connected with us.</p>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="example@mail.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>
            
            <p className="forgot-pass" onClick={goForgot}>Forgot Password?</p>
            
            <button type="submit" className="login-btn">LOG IN</button>
            
            {message && <p className="status-msg">{message}</p>}

            <p className="no-account">
              New here? <span onClick={toggleSignup}>Create an Account</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import "./Login.css";
import bg from "../images/1stbg.jpg.jpeg";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5004/api";

function Login({ toggleSignup, goForgot, goHome }) {
  const [formData, setFormData] = useState({
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
    setMessage("Logging in...");

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookie support
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token || ""); // optional if backend returns token

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
    <div className="login-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-box">
        <div className="login-header">
          <h1>LOGIN</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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

          <p className="forgot" onClick={goForgot} style={{ cursor: "pointer" }}>
            Forgot password?
          </p>

          <button type="submit">Login</button>

          {message && <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}

          <p className="signup">
            Don't have an account?{" "}
            <span onClick={toggleSignup} style={{ cursor: "pointer", color: "blue" }}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
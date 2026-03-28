import React, { useState } from "react";
import "./Login.css";
import bg from "../assets/LoginPage.png"; // background image

function Login({ toggleSignup, goForgot,goHome }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.0.163:5003/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        goHome();
        // redirect/dashboard later
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-box">

        {/* Header */}
        <div className="login-header">
          <h1>LOGIN</h1>
        </div>

        {/* Login form */}
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

          {/* Forgot Password */}
          <p
            className="forgot"
            style={{ cursor: "pointer" }}
            onClick={goForgot}
          >
            Forgot password?
          </p>

          <button type="submit">Login</button>

          {message && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {message}
            </p>
          )}

          {/* Signup link */}
          <p className="signup">
            Don't have an account?{" "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={toggleSignup}
            >
              Sign up
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;
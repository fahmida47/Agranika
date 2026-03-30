import React, { useState } from "react";
import "./Signup.css";
import bg from "../images/1stbg.jpg.jpeg"; // same background as Login

function Signup({ toggleLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
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
    setMessage('Signing up...');
    try {
      console.log('Sending signup request:', formData);
      const response = await fetch("http://localhost:5004/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (response.ok) {
  setMessage('Signup successful! Please login.');
  setFormData({ name: '', phone: '', email: '', password: '' });
} else {
  setMessage(`Error: ${data.message}`);
}
    } catch (error) {
      console.error('Signup error:', error);
      setMessage(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${bg})` }}>
      <div className="signup-box">
        {/* Header */}
        <div className="signup-header">
          <h1>SIGN UP</h1>
        </div>

        {/* Signup form */}
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

          {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

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
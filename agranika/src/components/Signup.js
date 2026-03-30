import React, { useState } from "react";
import "./Signup.css";
import bg from "../images/1stbg.jpg.jpeg"; 

function Signup({ toggleLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Signing up...');
    setMessageType('');

    try {
      console.log('Sending signup request:', formData);
      const response = await fetch('http://localhost:5002/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response status:', response.status, 'Response data:', data);

      if (response.ok) {
        setMessage(data.message || 'Signup successful! Please login.');
        setMessageType('success');
        setFormData({ name: '', phone: '', email: '', password: '' });
      } else {
        setMessage(data.message || 'Signup failed.');
        setMessageType('error');
      }

    } catch (error) {
      console.error('Signup error:', error);
      setMessage(`Network error: ${error.message}`);
      setMessageType('error');
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

          {message && (
            <p style={{ color: messageType === 'success' ? 'green' : 'red', marginTop: '10px' }}>
              {message}
            </p>
          )}

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
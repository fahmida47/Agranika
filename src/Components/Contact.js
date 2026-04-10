import React, { useState } from "react";
import "./Contact.css";
//import logo from "../Image/Logo.png";
//import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Submitted!");
  };

  return (
    <div className="page-wrapper">


      {/* Center Title */}
      <h1 className="brand-title">Agranika</h1> 

      <div className="contact-card">
        
        {/* Left Side */}
        <div className="contact-info">
          <h2>Contact Information</h2>

          <p className="info-item">🏢 Agranika Foundation</p>
          <p className="info-item">📍 Dhaka, Bangladesh</p>
          <p className="info-item">📧 info@agranika.com</p>
          <p className="info-item">📞 +880123456789</p>
        </div>
         
        {/* Right Side */}
        <div className="contact-form">
          <h2>Contact Us</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
            <textarea name="message" placeholder="Your message" onChange={handleChange} required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>

    </div>
  );
}

export default Contact;
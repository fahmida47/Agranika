import React, { useState, useRef, useContext, useEffect } from "react";
import bgImage from "../assets/Bg2.webp";
import { SponsorContext } from "./SponsorContext";

// API URL ta nishchit hoye naben (server.js e jeta thik korechilam)
const API_URL = "http://localhost:5004/api/sponsors/sponsor";

function Sponsor({ goLogin }) {
  const context = useContext(SponsorContext);
  const unsponsored = context?.unsponsored ?? 0;
  const setUnsponsored = context?.setUnsponsored ?? (() => {});
  const hasChecked = useRef(false);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    children: "",
    interval: ""
  });

  // Check login on load
  useEffect(() => {
    
    if (!localStorage.getItem("token")) {
        alert("Please login first!");
        goLogin();
    }
    if (hasChecked.current) return;
    hasChecked.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [goLogin]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const count = parseInt(form.children);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        credentials: "include", 
        body: JSON.stringify({ 
            ...form, 
            children: Number(form.children) 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Thank you! Your sponsorship has been recorded.");
        // Counter update
        if (count) setUnsponsored(prev => Math.max(prev - count, 0));
        // Reset form
        setForm({ firstName: "", lastName: "", phone: "", children: "", interval: "" });
      } else {
        
        alert("❌ " + (data.message || data.error));
        if (res.status === 401) goLogin(); 
      }
    } catch (err) {
      console.error(err);
      alert("❌ Network Error: Could not connect to server.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="hero sponsor-hero">
        <div className="hero-right">
          <img src={bgImage} alt="bg" className="bg-image" />
          <div className="hover-text">
            Within every child lies boundless potential, and education is the key to unlocking opportunities that allow this potential to flourish. By sponsoring a child, 
            you are providing marginalised children with essential tools that will empower them to change their reality and create a better and brighter future, not only 
            for themselves and their families but also for their communities as a whole.
          </div>
        </div>
      </div>

      <div className="counter-box">
        <h2>Number of Unsponsored Children</h2>
        <h1>{unsponsored}</h1>
      </div>

      <h1 className="form-title">Start Your Journey Today For Children</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input name="firstName" value={form.firstName} placeholder="First Name" onChange={handleChange} required />
          <input name="lastName" value={form.lastName} placeholder="Last Name" onChange={handleChange} required />
          
          {/* Email input field ta amra muche diyechi karon eta backend theke pabe */}
          
          <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} required />
          
          <select name="children" value={form.children} onChange={handleChange} required>
            <option value="">Number of Children</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          
          <select name="interval" value={form.interval} onChange={handleChange} required>
            <option value="">Contribution Interval</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Sponsorship"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sponsor;

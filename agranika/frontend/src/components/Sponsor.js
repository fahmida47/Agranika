import React, { useState, useRef, useContext, useEffect } from "react";
import bgImage from "../assets/Bg2.webp";
import { SponsorContext } from "./SponsorContext";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5004/api";

function Sponsor({ setPage }) {
  const context = useContext(SponsorContext);
  const unsponsored = context?.unsponsored ?? 0;
  const setUnsponsored = context?.setUnsponsored ?? (() => {});
  const hasChecked = useRef(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    children: "",
    interval: ""
  });

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const count = parseInt(form.children);

      // UI update
      if (count) {
        setUnsponsored(prev => Math.max(prev - count, 0));
      }

      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/sponsors`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          ...form,
          children: Number(form.children),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Thank you! Sponsor data saved.");

        // reset form
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          children: "",
          interval: ""
        });
      } else {
        alert("❌ " + data.message);
      }

    } catch (error) {
      console.error(error);
      alert("❌ Server error!");
    }

    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="hero sponsor-hero">
        <div className="hero-right">
          <img src={bgImage} alt="bg" className="bg-image" />
          <div className="hover-text">
           Within every child lies boundless potential, and education is the key to unlocking opportunities that allow this potential to flourish. By sponsoring a child, you are providing marginalised children with essential tools that will empower them to change their reality and create a better and brighter future, not only for themselves and their families but also for their communities as a whole.
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
          <input name="email" value={form.email} type="email" placeholder="Email" onChange={handleChange} required />
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
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sponsor;
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "./Imagenew/Bg2.webp";

function Sponsor() {
  const [unsponsored, setUnsponsored] = useState(1000);
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    children: "",
    interval: ""
  });

  // 🔒 PAGE PROTECTION + SCROLL TOP
  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    console.log("Sponsor useEffect running");
    const cameFromButton = sessionStorage.getItem("fromHome");
    console.log("cameFromButton:", cameFromButton);

    if (!cameFromButton) {
      console.log("Redirecting to home");
      navigate("/");
      return;
    }

    sessionStorage.removeItem("fromHome");
    console.log("Staying on sponsor page");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const count = parseInt(form.children);

    if (count) {
      setUnsponsored((prev) => Math.max(prev - count, 0));
    }

    alert("Thank you for your sponsorship! Your support helps change lives.");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero sponsor-hero">
        <div className="hero-right">
          <img src={bgImage} alt="bg" className="bg-image" />
          <div className="hover-text">Within every child lies boundless potential, and education is the key to unlocking opportunities that allow this potential to flourish. By sponsoring a child, you are providing marginalised children with essential tools that will empower them to change their reality and create a better and brighter future, not only for themselves and their families but also for their communities as a whole.</div>
        </div>
      </div>

      {/* COUNTER SECTION */}
      <div className="counter-box">
        <h2>Number of Unsponsored Children</h2>
        <h1>{unsponsored}</h1>
      </div>

      {/* TITLE */}
      <h1 className="form-title">
        Start Your Journey today For Children
      </h1>

      {/* FORM */}
      <div className="form-container">

        <form onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="phone" placeholder="Phone" onChange={handleChange} required />

          <select name="children" onChange={handleChange} required>
            <option value="">Number of Children</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <select name="interval" onChange={handleChange} required>
            <option value="">Contribution Interval</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          <button type="submit">Submit</button>
        </form>

      </div>

    </div>
  );
}

export default Sponsor;
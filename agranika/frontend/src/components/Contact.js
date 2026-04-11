import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";

function Contact({ goLogin }) {
  const [loading, setLoading] = useState(false);
  const hasChecked = useRef(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to contact us!");
      if (goLogin) goLogin();
      return;
    }

    if (!hasChecked.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      hasChecked.current = true;
    }
  }, [goLogin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please login first!");
      if (goLogin) goLogin();
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5004/api/contact/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert( (data.message || "✅ Message sent successfully!"));
        setForm({ name: "", phone: "", message: "" }); 
      } else {
        alert("❌ " + (data.message || "Failed to send message"));
        if (res.status === 401 && goLogin) goLogin();
      }
    } catch (err) {
      console.error("Contact Error:", err);
      alert("⚠️ Server error. Try again later.");
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
     <section className="contact-section" id="contact-section">
      <h1 className="contact-title">Agranika</h1> 
      
        
      <div className="contact-container">
        <div className="contact-left">
          <h2>Contact Information</h2>
          <p>🏢 Agranika Foundation</p>
          <p>📍 Dhaka, Bangladesh</p>
          <p>📧 info@agranika.com</p>
          <p>📞 +880123456789</p>
        </div>
          
        <div className="contact-right">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="contact-form">
              <input 
                type="text" 
                name="name" 
                value={form.name} 
                placeholder="Name" 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="contact-form">
              <input 
                type="text" 
                name="phone" 
                value={form.phone} 
                placeholder="Phone" 
                onChange={handleChange} 
              />
            </div>

            <div className="contact-form">
              <textarea 
                name="message" 
                value={form.message} 
                placeholder="Your message" 
                onChange={handleChange} 
                required
                rows="5"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
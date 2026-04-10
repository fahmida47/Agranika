import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <section className="contact-section" id="contact-section">
      <h1 className="contact-title">Agranika</h1>

      <div className="contact-container">
        <div className="contact-left">
          <h2>Contact Information</h2>
          <p>🏠 Agranika Foundation</p>
          <p>📍 Dhaka, Bangladesh</p>
          <p>✉️ info@agranika.com</p>
          <p>📞 +880123456789</p>
        </div>

        <div className="contact-right">
          <h2>Contact Us</h2>

          <form className="contact-form">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone" />
            <textarea placeholder="Your message"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
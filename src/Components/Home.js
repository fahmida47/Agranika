import React from 'react';
import '../App.css';
import bg from '../images/1stbg.jpg.jpeg';
import logo from '../images/logo.jpeg';
import TypingText from './TypingText';

const Home = ({ goLogin }) => {
  return (
    <>
      <section 
        className="hero" 
        style={{ backgroundImage: `url(${bg})` }}
      >

        {/* LOGO */}
        <img src={logo} alt="Agranika Logo" className="hero-logo" />

        {/* Hamburger Menu */}
        <div className="menu-container">
          <div className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="menu-social">

            <a href="https://facebook.com/yourprofile" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="fb"/>
              Facebook
            </a>

            <a href="mailto:yourgmail@gmail.com">
              <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="gmail"/>
              Gmail
            </a>

            <a href="tel:+880123456789">
              📞 +8801400252656
            </a>

          </div>
        </div>

        <div className="hero-text">
          <h1>অগ্রণীকা</h1>
          <h2>AGRANIKA</h2>

          <TypingText 
            text="Where Every Child Finds Hope" 
            speed={100} 
            className="hero-subtitle"
          />

          <button className="learn-btn" onClick={goLogin}>
            Learn More
          </button>
        </div>

      </section>
    </>
  );
};

export default Home;
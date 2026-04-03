import { useNavigate } from "react-router-dom";
import logo from "./Imagenew/logo(1).png";
import bgImage from "./Imagenew/Bg.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">

      {/* HERO */}
      <div className="hero">

        <div className="hero-left">
          <img src={logo} alt="logo" className="logo" />

          <div className="text-area">
            <h1>Empowering Futures Through Education</h1>
          </div>
        </div>

        <div className="hero-right">
          <img src={bgImage} alt="bg" />
        </div>

      </div>

      {/* SPONSOR SECTION */}
      <div className="sponsor-section" id="sponsor">

        <div className="sponsor-card">

          <h2>Sponsor a child program</h2>

          <p>
            We believe in the potential of every child and that education is the key to unlocking that potential.
            Yet, due to financial constraints, for countless children, education is an unattainable luxury.
            For the first time , we eagely wanted to change this reality!
          </p>

          <p>
            Through our Sponsor A Child Program, we have ensured quality education for over 5000 children
            from underserved communities.
          </p>

          <p>
            You can also join the initiative. With just BDT 2,500 per month, you can give children in need access
            to educational opportunities and support their journey towards a brighter future.
          </p>

          <button
            type="button"
            onClick={() => {
              console.log("Sponsor button clicked, going to sponsor page");
              navigate("/sponsor");
            }}
          >
            Sponsor a Child
          </button>
        </div>

      </div>

    </div>
  );
}

export default Home;
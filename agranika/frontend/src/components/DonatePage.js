import React, { useState } from "react";
import "./DonatePage.css";

const DonatePage = ({ goHome }) => {
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState("");
  const [giftQty, setGiftQty] = useState(1);

  const handleAmountClick = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(val);
  };

  const handleDonate = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    alert(`Thank you for donating ${amount} BDT!`);
  };

  return (
    <div className="donate-container">
      <h1>Help our children make their lives better</h1>
      <p>
        Your support is important to our mission of providing education and
        empowerment to underprivileged children in Bangladesh.
      </p>

      <div className="donation-amounts">
        <button
          className={amount === 500 ? "active" : ""}
          onClick={() => handleAmountClick(500)}
        >
          500 BDT
        </button>
        <button
          className={amount === 2500 ? "active" : ""}
          onClick={() => handleAmountClick(2500)}
        >
          2500 BDT
        </button>
        <button
          className={amount === 5000 ? "active" : ""}
          onClick={() => handleAmountClick(5000)}
        >
          5000 BDT
        </button>
        <input
          type="number"
          placeholder="Custom Amount"
          value={customAmount}
          onChange={handleCustomAmountChange}
        />
      </div>

      <div className="gift-items">
        <label>Gift Items:</label>
        <input
          type="number"
          min="1"
          value={giftQty}
          onChange={(e) => setGiftQty(e.target.value)}
        />
      </div>

      <div className="donate-buttons">
        <button className="donate-btn" onClick={handleDonate}>
          Donate {amount} BDT
        </button>
    
      </div>
    </div>
  );
};

export default DonatePage;
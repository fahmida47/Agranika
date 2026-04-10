import React, { useState } from "react";
import "./DonatePage.css";

const DonatePage = ({ goLogin }) => { 
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    phone: "",
  });

  const [gifts, setGifts] = useState({
    bag: 0,
    pencil: 0,
    uniform: 0,
  });

  const updateGift = (item, value) => {
    setGifts({
      ...gifts,
      [item]: value < 0 ? 0 : value,
    });
  };

  const handleAmountClick = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(val);
  };

  const totalAmount =
    Number(amount) +
    gifts.bag * 500 +
    gifts.pencil * 200 +
    gifts.uniform * 1000;

  const handleDonateClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Please login first to make a donation.");
      if (goLogin) goLogin(); 
      return;
    }

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }
    setShowForm(true);
  };

  const handleFinalSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert("Fill all fields!");
      return;
    }

    if (!paymentMethod) {
      alert("Select payment method!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      const res = await fetch("http://localhost:5004/api/donation/donate", { 
        method: "POST",
        credentials: "include", 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          amount: totalAmount,
          paymentMethod,
          gifts,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Donation successful! Thank you ❤️");
        setShowForm(false);
        setFormData({ name: "", email: "", phone: "" });
        setAmount(2500);
        setCustomAmount("");
        setGifts({ bag: 0, pencil: 0, uniform: 0 });
        setPaymentMethod("");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="donate-container">
      <h2>Help our children make their lives better</h2>
      <p>Your support helps children in Bangladesh ❤️</p>

      {/* Amount */}
      <div className="donation-container">
        <div className="donation-amounts">
          {[500, 2500, 5000].map((val) => (
            <button
              key={val}
              className={amount === val ? "active" : ""}
              onClick={() => handleAmountClick(val)}
            >
              {val} BDT
            </button>
          ))}
          <input
            type="number"
            placeholder="Custom"
            value={customAmount}
            onChange={handleCustomAmountChange}
          />
        </div>
      </div>

      {/* Gifts */}
      <div className="gift-section">
        <h3>Select Gift Items</h3>
        <div className="gift-cards">
          {/* Bag */}
          <div className="gift-card">
            <img src="https://cdn-icons-png.flaticon.com/128/11258/11258861.png" alt="Bag" />
            <p>School Bag (500 BDT)</p>
            <div className="qty">
              <button onClick={() => updateGift("bag", gifts.bag - 1)}>-</button>
              <span>{gifts.bag}</span>
              <button onClick={() => updateGift("bag", gifts.bag + 1)}>+</button>
            </div>
          </div>
          {/* Pencil */}
          <div className="gift-card">
            <img src="https://cdn-icons-png.flaticon.com/128/4100/4100658.png" alt="Pencil" />
            <p>Pencil Box (200 BDT)</p>
            <div className="qty">
              <button onClick={() => updateGift("pencil", gifts.pencil - 1)}>-</button>
              <span>{gifts.pencil}</span>
              <button onClick={() => updateGift("pencil", gifts.pencil + 1)}>+</button>
            </div>
          </div>
          {/* Uniform */}
          <div className="gift-card">
            <img src="https://cdn-icons-png.flaticon.com/128/2103/2103475.png" alt="Uniform" />
            <p>School Uniform (1000 BDT)</p>
            <div className="qty">
              <button onClick={() => updateGift("uniform", gifts.uniform - 1)}>-</button>
              <span>{gifts.uniform}</span>
              <button onClick={() => updateGift("uniform", gifts.uniform + 1)}>+</button>
            </div>
          </div>
        </div>
        <p>Total Gifts: {gifts.bag * 500 + gifts.pencil * 200 + gifts.uniform * 1000} BDT</p>
      </div>

      <button className="donate-btn" onClick={handleDonateClick}>
        Donate {totalAmount} BDT
      </button>

      {showForm && (
        <div className="donation-form">
          <h2>Donor Info</h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <h3>Payment</h3>
          <div className="payment-methods">
            <button className={paymentMethod === "bkash" ? "active" : ""} onClick={() => setPaymentMethod("bkash")}>bKash</button>
            <button className={paymentMethod === "nagad" ? "active" : ""} onClick={() => setPaymentMethod("nagad")}>Nagad</button>
          </div>

          <button className="submit-btn" onClick={handleFinalSubmit}>Confirm Donation</button>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
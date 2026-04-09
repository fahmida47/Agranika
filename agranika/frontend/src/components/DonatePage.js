import React, { useState } from "react";
import "./DonatePage.css";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5004/api";

const DonatePage = () => {
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

  const handleDonateClick = () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }
    setShowForm(true);
  };

  const totalAmount =
    Number(amount) +
    gifts.bag * 500 +
    gifts.pencil * 200 +
    gifts.uniform * 1000;

  // 🔐 JWT Protected Submission
  const handleFinalSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Fill all fields!");
      return;
    }

    if (!paymentMethod) {
      alert("Select payment method!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE}/donation/donate`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          ...formData,
          amount: totalAmount,
          paymentMethod,
          gifts,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Donation successful! Thank you ❤️");
        setShowForm(false);

        // Reset form
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
          <div className="gift-card">
            <img
              src="https://cdn-icons-png.flaticon.com/128/11258/11258861.png"
              alt="School Bag"
            />
            <p>School Bag (500 BDT)</p>
            <div className="qty">
              <button onClick={() => updateGift("bag", gifts.bag - 1)}>-</button>
              <span>{gifts.bag}</span>
              <button onClick={() => updateGift("bag", gifts.bag + 1)}>+</button>
            </div>
          </div>

          <div className="gift-card">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4100/4100658.png"
              alt="Pencil Box"
            />
            <p>Pencil Box (200 BDT)</p>
            <div className="qty">
              <button onClick={() => updateGift("pencil", gifts.pencil - 1)}>-</button>
              <span>{gifts.pencil}</span>
              <button onClick={() => updateGift("pencil", gifts.pencil + 1)}>+</button>
            </div>
          </div>

          <div className="gift-card">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2103/2103475.png"
              alt="School Uniform"
            />
            <p>School Uniform (1000 BDT)</p>
            <div className="qty">
              <button onClick={() => updateGift("uniform", gifts.uniform - 1)}>-</button>
              <span>{gifts.uniform}</span>
              <button onClick={() => updateGift("uniform", gifts.uniform + 1)}>+</button>
            </div>
          </div>
        </div>
        <p>Total Gifts: {gifts.bag*500 + gifts.pencil*200 + gifts.uniform*1000} BDT</p>
      </div>

      {/* Donate Button */}
      <button className="donate-btn" onClick={handleDonateClick}>
        Donate {totalAmount} BDT
      </button>

      {/* Donation Form */}
      {showForm && (
        <div className="donation-form">
          <h2>Donor Info</h2>

          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />

          <h3>Payment</h3>
          <div className="payment-methods">
            <button
              className={paymentMethod === "bkash" ? "active" : ""}
              onClick={() => setPaymentMethod("bkash")}
            >
              bKash
            </button>
            <button
              className={paymentMethod === "nagad" ? "active" : ""}
              onClick={() => setPaymentMethod("nagad")}
            >
              Nagad
            </button>
          </div>

          <button className="submit-btn" onClick={handleFinalSubmit}>
            Confirm Donation
          </button>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
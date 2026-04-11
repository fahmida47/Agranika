import React, { useEffect, useState } from "react";
import "./DonationHistory.css";

const DonationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5004/api/donation/history", {
          method: "GET",
          credentials: "include", 
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok) {
          setHistory(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="loading">Loading history...</div>;

  return (
    <div className="history-container">
      <h2>My Donation History</h2>
      <p>Thank you for making a difference! ❤️</p>

      {history.length === 0 ? (
        <div className="no-data">No donations found yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Donor Name</th>
                <th>Phone</th>
                <th>Total Amount</th>
                <th>Gifts Donated</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td className="amount-cell">{item.amount} BDT</td>
                  <td>
                    <div className="gift-badges">
                      {item.gifts.bag > 0 && <span className="badge">Bag: {item.gifts.bag}</span>}
                      {item.gifts.pencil > 0 && <span className="badge">Pencil: {item.gifts.pencil}</span>}
                      {item.gifts.uniform > 0 && <span className="badge">Uniform: {item.gifts.uniform}</span>}
                      {item.gifts.bag === 0 && item.gifts.pencil === 0 && item.gifts.uniform === 0 && "General"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
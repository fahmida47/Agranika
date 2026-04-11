import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState({
    stats: { totalUsers: 0, totalDonations: 0, totalChildren: 0 },
    donations: [],
    users: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5004/api/admin/stats", {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const result = await res.json();
        
        if (res.ok) {
          setData(result);
        } else {
          console.error("Failed to fetch:", result.message);
        }
      } catch (err) {
        console.error("Network Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <div className="loader">Loading Dashboard Data...</div>;

  return (
    <div className="admin-dashboard-container">
      <h1>📊 Admin Control Panel</h1>
      
      {/* 1. Stats Cards */}
      <div className="stats-row">
        <div className="card">
          <h3>Total Users</h3>
          <p>{data.stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Total Donations</h3>
          {/* Note: Backend e 'totalDonationAmount' ba 'totalDonations' thakle sheta ekhane likhun */}
          <p>{data.stats.totalDonationAmount || 0} BDT</p>
        </div>
        <div className="card">
          <h3>Children</h3>
          <p>{data.stats.totalChildren}</p>
        </div>
      </div>

      {/* 2. Donation Monitor */}
      <h2>💰 Donation Monitor</h2>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.donations.length > 0 ? (
              data.donations.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td className="amount-td">{d.amount} BDT</td>
                  <td><span className="method-tag">{d.paymentMethod || "bKash"}</span></td>
                  <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{textAlign: 'center'}}>No donations found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
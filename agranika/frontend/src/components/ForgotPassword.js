import React, { useState } from "react";
import "./Login.css";
import bg from "../images/1stbg.jpg.jpeg";

function ForgotPassword({ toggleLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetData, setResetData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await sendResetLink();
  };

  const sendResetLink = async () => {
    setIsLoading(true);
    setMessage("Sending reset link...");

    try {
      const response = await fetch('http://localhost:5004/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Reset link sent to your email! (For demo: use token 'demo123')");
        setShowResetForm(true);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error sending reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (resetData.newPassword !== resetData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    setMessage("Resetting password...");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5004/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token: resetData.token,
          newPassword: resetData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! Please login.");
        setTimeout(() => toggleLogin(), 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error resetting password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-box">
        <div className="login-header">
          <h1>RESET PASSWORD</h1>
        </div>

        {!showResetForm ? (
          <form className="login-form" onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>

            {message && (
              <p style={{ color: message.includes("Error") ? "red" : "green", marginTop: "10px" }}>
                {message}
              </p>
            )}

            {message.includes("Reset link sent") && (
              <button
                type="button"
                onClick={sendResetLink}
                disabled={isLoading}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#28a745",
                  border: "none",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: "14px"
                }}
              >
                {isLoading ? "Resending..." : "Resend Link"}
              </button>
            )}

            <p className="signup">
              Remember password?{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={toggleLogin}
              >
                Login
              </span>
            </p>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleResetSubmit}>
            <input
              type="text"
              placeholder="Reset Token (use: demo123)"
              value={resetData.token}
              onChange={(e) => setResetData({...resetData, token: e.target.value})}
              required
            />

            <input
              type="password"
              placeholder="New Password"
              value={resetData.newPassword}
              onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={resetData.confirmPassword}
              onChange={(e) => setResetData({...resetData, confirmPassword: e.target.value})}
              required
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>

            {message && (
              <p style={{ color: message.includes("Error") || message.includes("don't match") ? "red" : "green", marginTop: "10px" }}>
                {message}
              </p>
            )}

            <p className="signup">
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => setShowResetForm(false)}
              >
                Back to Email
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

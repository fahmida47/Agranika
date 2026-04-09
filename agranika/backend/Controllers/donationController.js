// controllers/DonationController.js
import Donation from "../Models/Donation.js";
import jwt from "jsonwebtoken";

// JWT middleware
export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Create donation
export const createDonation = async (req, res) => {
  try {
    const { name, email, phone, amount, gifts } = req.body;

    const donationData = {
      name,
      email,
      phone,
      amount,
      gifts,
      userId: req.user?.id || null,
    };

    const donation = new Donation(donationData);
    await donation.save();

    return res.status(201).json({ message: "Donation saved successfully!", donation });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
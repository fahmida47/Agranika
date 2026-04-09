import Sponsor from "../Models/Sponsorship.js";
import jwt from "jsonwebtoken";

// Optional JWT middleware
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

// Create sponsor entry
export const createSponsor = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, children, interval } = req.body;

    const sponsorData = {
      firstName,
      lastName,
      email,
      phone,
      children,
      interval,
      userId: req.user?.id || null,
    };

    const sponsor = new Sponsor(sponsorData);
    await sponsor.save();

    return res.status(201).json({
      message: "Sponsor data saved successfully!",
      sponsor,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
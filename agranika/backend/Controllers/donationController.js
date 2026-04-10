import Donation from "../Models/Donation.js";

// Create donation (Login Required)
export const createDonation = async (req, res) => {
  try {
    // req.body theke name, phone, amount, gifts nibo (email nibo na login theke pabo bole)
    const { name, phone, amount, gifts } = req.body;

    // 1. Check user login (Safety check, middleware thakle eita auto verify hobe)
    if (!req.user) {
      return res.status(401).json({ message: "Access denied. Please login to donate." });
    }

    const donationData = {
      name,
      email: req.user.email, // 🔐 Automatically login kora user-er email bose jabe
      phone,
      amount,
      gifts,
      userId: req.user.id,    // 🔐 User ID-o save hobe
    };

    const donation = new Donation(donationData);
    await donation.save();

    return res.status(201).json({ 
      message: "✅ Donation recorded successfully! Thank you for your support.", 
      donation 
    });
  } catch (err) {
    console.error("Donation Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};
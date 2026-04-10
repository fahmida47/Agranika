import Donation from "../Models/Donation.js";

// Create donation (Login Required)
export const createDonation = async (req, res) => {
  try {
    
    const { name, phone, amount, gifts } = req.body;

    
    if (!req.user) {
      return res.status(401).json({ message: "Access denied. Please login to donate." });
    }

    const donationData = {
      name,
      email: req.user.email, 
      phone,
      amount,
      gifts,
      userId: req.user.id,   
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
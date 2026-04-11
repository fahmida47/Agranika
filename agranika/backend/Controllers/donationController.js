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

// Get all donations for the logged-in user
export const getDonationHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // find({ userId: req.user.id }) diye shudhu oi user-er data-gulo ana hochche
    const history = await Donation.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDonationsForAdmin = async (req, res) => {
  try {
   
    const allDonations = await Donation.find().sort({ createdAt: -1 });
    
    res.status(200).json(allDonations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
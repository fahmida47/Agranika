import Sponsor from "../Models/Sponsorship.js";

export const createSponsor = async (req, res) => {
  try {
   
    const { firstName, lastName, phone, children, interval } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! Please login." });
    }

    const sponsor = new Sponsor({
      firstName,
      lastName,
      email: req.user.email, 
      phone,
      children,
      interval,
      userId: req.user.id,    
    });

    await sponsor.save();

    res.status(201).json({
      message: "Sponsorship successful!",
      sponsor,
    });

  } catch (err) {
    console.log("Sponsor Create Error:", err);
    res.status(500).json({ message: err.message });
  }
};

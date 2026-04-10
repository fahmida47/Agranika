import Sponsor from "../Models/Sponsorship.js";

export const createSponsor = async (req, res) => {
  try {
    // 🛑 req.body theke email nite hobe na, login user-er email-i hobe ashol email
    const { firstName, lastName, phone, children, interval } = req.body;

    // req.user asche amader 'checkToken' middleware theke
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! Please login." });
    }

    const sponsor = new Sponsor({
      firstName,
      lastName,
      email: req.user.email, // 🔐 Automatically login kora email save hobe
      phone,
      children,
      interval,
      userId: req.user.id,    // 🔐 User ID-o save hobe
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

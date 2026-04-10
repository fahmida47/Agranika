import Contact from "../Models/Contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Login required to send message." });
    }

    const newMessage = new Contact({
      name,
      email: req.user.email, 
      phone,
      message,
      userId: req.user.id,
    });

    await newMessage.save();

    res.status(201).json({ 
      message: "✅ Message sent successfully! We'll get back to you soon." 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error, please try again." });
  }
};
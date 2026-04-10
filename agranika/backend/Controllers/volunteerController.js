import Volunteer from "../Models/Volunteer.js";

export const createVolunteerApplication = async (req, res) => {
  try {
    const { fullName, phone, age, address, interest, message } = req.body;

   
    if (!req.user) {
      return res.status(401).json({ message: "Please login to apply." });
    }

    const volunteerData = new Volunteer({
      fullName,
      email: req.user.email, 
      phone,
      age,
      address,
      interest,
      message,
      userId: req.user.id,  
    });

    await volunteerData.save();

    return res.status(201).json({ 
      message: "✅ Application submitted successfully! We will contact you soon.", 
      volunteerData 
    });
  } catch (err) {
    console.error("Volunteer Error:", err.message);
    return res.status(500).json({ message: "Server error, try again later." });
  }
};
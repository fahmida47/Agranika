import User from "../Models/User.js";
import Donation from "../Models/Donation.js";
import Child from "../Models/Child.js"; 
import Sponsor from "../Models/Sponsorship.js"; 

export const getAdminDashboardStats = async (req, res) => {
  try {
  
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalChildren = (await Child.countDocuments()) || 20;
    const donations = await Donation.find().sort({ createdAt: -1 });
    
 
    const sponsorships = await Sponsor.find();
   
    const sponsoredChildrenCount = sponsorships.reduce((sum, item) => sum + (Number(item.children) || 0), 0);

  
    const totalDonationAmount = donations.reduce((sum, item) => sum + item.amount, 0);

    const allUsers = await User.find({ role: "user" }).select("-password");

    res.status(200).json({
      stats: {
        totalUsers,
        totalChildren,
        totalDonationAmount,
        sponsoredChildrenCount, 
      },
      donations,
      users: allUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
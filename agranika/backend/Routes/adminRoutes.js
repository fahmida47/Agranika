import express from "express";
import { getAdminDashboardStats, deleteUser } from "../Controllers/adminController.js";
import checkToken from "../Middlewares/authMiddleware.js";
import { isAdmin } from "../Middlewares/adminMiddleware.js";
import Child from "../Models/Child.js"; 

const router = express.Router();


router.post("/seed-children", checkToken, isAdmin, async (req, res) => {
  try {
    const childrenProfiles = [
      { name: "Amina", age: 11, className: "Class 5", gender: "Female" },
      { name: "Rahim", age: 8, className: "Class 2", gender: "Male" },
      { name: "Sumaiya", age: 12, className: "Class 6", gender: "Female" },
      { name: "Karim", age: 10, className: "Class 4", gender: "Male" },
      { name: "Nusrat", age: 11, className: "Class 5", gender: "Female" },
      { name: "Hasan", age: 12, className: "Class 6", gender: "Male" },
      { name: "Mim", age: 8, className: "Class 2", gender: "Female" },
      { name: "Sabbir", age: 10, className: "Class 4", gender: "Male" },
      { name: "Tania", age: 12, className: "Class 6", gender: "Female" },
      { name: "Jony", age: 11, className: "Class 5", gender: "Male" },
      { name: "Priya", age: 13, className: "Class 7", gender: "Female" },
      { name: "Rakib", age: 12, className: "Class 6", gender: "Male" },
      { name: "Lamia", age: 8, className: "Class 2", gender: "Female" },
      { name: "Rifat", age: 11, className: "Class 5", gender: "Male" },
      { name: "Sadia", age: 12, className: "Class 6", gender: "Female" },
      { name: "Nabil", age: 9, className: "Class 3", gender: "Male" },
      { name: "Mahi", age: 7, className: "Class 1", gender: "Female" },
      { name: "Omar", age: 6, className: "Class KG", gender: "Male" },
      { name: "Tuba", age: 14, className: "Class 8", gender: "Female" },
      { name: "Farhan", age: 15, className: "Class 9", gender: "Male" }
    ];

   
    await Child.deleteMany({}); 
    await Child.insertMany(childrenProfiles);

    res.status(200).json({ message: "Success! 20 Children added to database." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/stats", checkToken, isAdmin, getAdminDashboardStats);
router.delete("/user/:id", checkToken, isAdmin, deleteUser);

export default router;
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
 
  const { token } = req.cookies;

  if (!token) {
    
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded; 

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);

    
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, 
      sameSite: "lax", 
      path: "/",
    });

    return res.status(401).json({ error: "Invalid token" });
  }
};

export default checkToken;
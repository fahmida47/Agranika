import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  // 1. Cookie theke token neya
  const { token } = req.cookies;

  if (!token) {
    // Token na thakle ekhane 'No token found' message deya bhalo debugging-er jonno
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // 2. Secret key diye verify kora
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. User data request object-e pathiye deya
    req.user = decoded; 

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);

    // 4. Token invalid hole cookie clear kora (Controller-er sathe config mil thakte hobe)
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Localhost-e thakle false thakte hobe
      sameSite: "lax", // Login-e 'lax' thakle ekhaneও 'lax' hobe
      path: "/",
    });

    return res.status(401).json({ error: "Invalid token" });
  }
};

export default checkToken;
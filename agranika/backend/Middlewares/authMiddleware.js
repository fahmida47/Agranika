import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;   // ✅ THIS LINE IS THE KEY

    next();
  } catch (err) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default checkToken;
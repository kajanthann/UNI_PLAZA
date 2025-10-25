import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.aToken;
    if (!token) return res.status(401).json({ success: false, message: "No token. Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authAdmin;

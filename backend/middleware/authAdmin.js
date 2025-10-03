import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    // Read token from cookie
    const aToken = req.cookies?.aToken;
    if (!aToken) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again." });
    }

    const decoded = jwt.verify(aToken, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") {
      return res.status(401).json({ success: false, message: "Not authorized. Login again." });
    }

    req.admin = decoded; // Attach admin info
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authAdmin;

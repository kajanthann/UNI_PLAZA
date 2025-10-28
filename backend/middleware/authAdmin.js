import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies.aToken || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token. Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please login again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token. Not authorized." });
    } else {
      return res.status(401).json({ success: false, message: "Authorization error" });
    }
  }
};

export default authAdmin;

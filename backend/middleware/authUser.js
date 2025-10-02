import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
    }

    // Option 1: Only attach userId
    req.userId = decoded.id;

    // Option 2: Fetch user from DB (optional)
    // req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token or session expired." });
  }
};

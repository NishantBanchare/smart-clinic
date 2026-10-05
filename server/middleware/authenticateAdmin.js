const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  // Get token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store admin information in request
    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Admin authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authenticateAdmin;
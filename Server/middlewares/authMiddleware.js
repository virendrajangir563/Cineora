
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // Step 1: Check JWT secret configuration
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).json({
        message: "Server authentication configuration error",
      });
    }

    // Step 2: Read token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided. Please login.",
      });
    }

    // Step 3: Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Step 4: Attach decoded user data to request
    req.user = decoded;

    // Step 5: Continue to next middleware/controller
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }

    return res.status(401).json({
      message: "Invalid token. Please login again.",
    });
  }
};

module.exports = protect;

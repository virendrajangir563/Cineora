
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Step 1: Check authentication
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    // Step 2: Check user role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You are not allowed to access this resource",
      });
    }

    // Step 3: Allow access
    return next();
  };
};

module.exports = authorizeRoles;

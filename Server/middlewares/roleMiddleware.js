const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
   
    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You are not allowed to access this resource",
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
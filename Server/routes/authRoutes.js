
const express = require("express");

const {
  signup,
  login,
  verifyMe,
  logout
} = require("../controllers/authControllers");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

// Signup and Login
router.post("/signup", signup);
router.post("/login", login);
router.get("/verifyMe", protect, verifyMe);
router.post("/logout", logout);

// Verify token / current user
router.get("/verify", protect, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    user: req.user,
  });
});

// Profile
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Profile accessed successfully",
    user: req.user,
  });
});

// Customer only
router.get(
  "/customer",
  protect,
  authorizeRoles("customer"),
  (req, res) => {
    res.status(200).json({
      message: "Customer route accessed successfully",
    });
  }
);

// Theater owner only
router.get(
  "/theater-owner",
  protect,
  authorizeRoles("theaterOwner"),
  (req, res) => {
    res.status(200).json({
      message: "Theater owner route accessed successfully",
    });
  }
);

// Admin only
router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Admin route accessed successfully",
    });
  }
);

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
});

module.exports = router;

const express = require("express");

const {
  signup,
  login,
} = require("../controllers/authControllers");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();



router.post("/signup", signup);
router.post("/login", login);



router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile accessed successfully",
    user: req.user,
  });
});



router.get(
  "/customer",
  protect,
  authorizeRoles("customer"),
  (req, res) => {
    res.json({
      message: "Customer route accessed successfully",
    });
  }
);



router.get(
  "/theater-owner",
  protect,
  authorizeRoles("theaterOwner"),
  (req, res) => {
    res.json({
      message: "Theater owner route accessed successfully",
    });
  }
);



router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Admin route accessed successfully",
    });
  }
);


module.exports = router;
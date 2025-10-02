const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login page
router.get("/login", (req, res) =>
  res.render("auth/login", { error: null, success: null, title: "Login" })
);

// Register page
router.get("/register", (req, res) =>
  res.render("auth/register", { error: null, success: null, title: "Register" })
);

// Auth actions
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/logout", authController.logout);

module.exports = router;

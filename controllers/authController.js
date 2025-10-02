const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("auth/register", {
        error: "Username already taken",
        success: null,
        title: "Register",
      });
    }

    const user = new User({ username, password });
    await user.save();

    return res.render("auth/login", {
      error: null,
      success: "Account created successfully. Please log in.",
      title: "Login",
    });
  } catch (err) {
    res.render("auth/register", {
      error: "Error registering user: " + err.message,
      success: null,
      title: "Register",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("auth/login", {
        error: "User not found",
        success: null,
        title: "Login",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render("auth/login", {
        error: "Invalid credentials",
        success: null,
        title: "Login",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/products");
  } catch (err) {
    res.render("auth/login", {
      error: "Error logging in: " + err.message,
      success: null,
      title: "Login",
    });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};

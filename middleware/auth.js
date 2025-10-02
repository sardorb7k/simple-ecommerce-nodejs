// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

exports.attachUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    res.locals.user = user;
  } catch (err) {
    res.locals.user = null;
  }
  next();
};

exports.requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  next();
};

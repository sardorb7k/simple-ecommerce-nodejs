const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { requireAuth } = require("../middleware/auth");

// Add to cart
router.post("/add/:id", requireAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!req.session.cart) {
    req.session.cart = { items: [] };
  }

  const existing = req.session.cart.items.find(
    (item) => item.product._id.toString() === product._id.toString()
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    req.session.cart.items.push({ product, quantity: 1 });
  }

  res.redirect("/cart");
});

// View cart
router.get("/", requireAuth, (req, res) => {
  const cart = req.session.cart || { items: [] };
  res.render("cart/index", { cart, title: "Your Cart" });
});

// Remove item from cart
router.post("/remove/:id", requireAuth, (req, res) => {
  if (!req.session.cart) return res.redirect("/cart");

  req.session.cart.items = req.session.cart.items.filter(
    (item) => item.product._id.toString() !== req.params.id
  );

  res.redirect("/cart");
});

module.exports = router;

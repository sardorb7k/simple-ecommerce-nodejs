const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { requireAuth } = require("../middleware/auth");

// Place new order
router.post("/", requireAuth, async (req, res) => {
  try {
    const cart = req.session.cart;
    if (!cart || cart.items.length === 0) return res.redirect("/cart");

    // Calculate total
    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    const order = new Order({
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    await order.save();

    // Clear cart
    req.session.cart = { items: [] };

    res.redirect("/orders/" + order._id);
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).send("Failed to place order");
  }
});

// Show single order
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    res.render("orders/show", { order, title: "Orders" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Order not found");
  }
});

module.exports = router;

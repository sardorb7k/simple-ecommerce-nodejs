const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Show user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id }).populate(
      "items.product"
    );
    res.render("cart/index", { cart, title: "Your Cart" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart");
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    let cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) cart = new Cart({ user: req.user?._id, items: [] });

    const itemIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to cart");
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const cart = await Cart.findOne({ user: req.user?._id });
    if (cart) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
      await cart.save();
    }
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing from cart");
  }
};

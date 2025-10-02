const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) return res.redirect("/cart");

    const order = new Order({
      user: req.user._id,
      items: cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
      })),
      totalPrice: cart.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      ),
    });

    await order.save();
    cart.items = [];
    await cart.save();

    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error placing order");
  }
};

// Get order history
exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );
    res.render("orders/index", { orders, title: "Your Orders" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orders");
  }
};

// Show single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) return res.status(404).send("Order not found");
    res.render("orders/show", { order, title: "Order Details" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching order");
  }
};

const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products/index", { products, title: "Products" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("products/details", { product, title: product.name });
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
};

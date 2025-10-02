const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// List all products
router.get("/", productController.getProducts);

// Show single product
router.get("/:id", productController.getProductById);

module.exports = router;

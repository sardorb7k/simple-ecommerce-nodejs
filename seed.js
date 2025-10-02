require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "iPhone 15",
    price: 999,
    description: "Latest Apple smartphone",
    imageUrl:
      "https://i5.walmartimages.com/seo/Restored-Apple-iPhone-15-Pro-Max-T-Mobile-512-GB-Blue-Titanium-Refurbished_dd2d42c6-cc25-4bee-81ef-7847120498d5.663475b807d168a41e9082d258d9c7ce.jpeg",
  },
  {
    name: "Samsung Galaxy S24",
    price: 899,
    description: "Flagship Samsung phone",
    imageUrl:
      "https://assets.asaxiy.uz/product/items/desktop/109a0ca3bc27f3e96597370d5c8cf03d20240127152925917296tunpkMQAV.png.webp",
  },
  {
    name: "MacBook Air M3",
    price: 1299,
    description: "Lightweight and powerful Apple laptop",
    imageUrl:
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_13_m3_2024_hero.png",
  },
  {
    name: "Sony WH-1000XM5",
    price: 399,
    description: "Noise-cancelling headphones",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbxgs_CwvNCmr9iMqOseJwgHm8J_1h1h2Sow&s",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌱 Connected to DB, seeding...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Products inserted!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });

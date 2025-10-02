# E-Commerce Node.js App

A simple e-commerce application built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Implements basic functionality like user authentication, product listing, cart management, and order placement using the **MVC pattern**.

---

## Features

- User Registration and Login (with session & JWT)
- Product Listing & Product Details
- Cart Management (Add, Remove, View)
- Place Orders
- Protected routes for authenticated users
- Layout with EJS templates
- MongoDB integration

---

## Installation

1. **Clone the repository**
2. **npm install**
3. **Set environment variables in a .env file**

- MONGO_URI=your_mongodb_connection_string
- SESSION_SECRET=your_session_secret
- JWT_SECRET=your_jwt_secret
- PORT=5000

4. **Run the app**
   npm start
5. **Open your browser and go to http://localhost:5000**

---

## Notes

- All routes related to Cart and Orders require the user to be logged in.
- Default layout is handled by express-ejs-layouts.
- Uses sessions for cart storage and JWT for authentication.
- MongoDB is required for storing users, products, carts, and orders.

---

## Folder Structure

- Controllers: Handles the logic and interacts with models.
- Models: Defines schemas for MongoDB.
- Routes: Handles HTTP requests and maps to controllers.
- Views: EJS templates for rendering HTML.
- Middleware: For authentication, session handling, etc.

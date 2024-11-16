const express = require("express");
const app = express();
const cors = require("cors");
require("colors");
const morgan = require("morgan");

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const mode = process.env.MODE || "production";
require('dotenv').config()

// middleware
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://bookstore-client-two.vercel.app'],
    credentials: true
}));

app.use(morgan("dev"));

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes =  require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.DB);
  app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}

main().then(() => console.log("Mongodb connected successfully!".bgGreen.white)).catch(err => console.log(`Error: ${err}`.bgRed.white));

app.listen(port, () => {
  console.log(`Server running on ${mode} mode on http://localhost:${port}`.bgMagenta.white);
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoute");
const addressRoutes = require("./routes/addressRoute");
const adminRoutes = require("./routes/adminRoute");
const ratingRoutes = require("./routes/ratingRoute");
const wishlistRoutes = require("./routes/wishlistRoute");
const paymentRoutes = require("./routes/paymentRoute");
const newSletterRoutes = require("./routes/newSletterRoute");
const orderRoutes = require("./routes/orderRoute");

app.use(cors());
app.use("/api/payment/webhook", bodyParser.raw({ type: "application/json" }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/payment/", paymentRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/auth/", authRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/order/", orderRoutes);
app.use("/api/address/", addressRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/rating/", ratingRoutes);
app.use("/api/wishList/", wishlistRoutes);
app.use("/api/newSletter/", newSletterRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Welcome to the ");
});
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  stock: Number,
  size: { type: Array, default: ["small"] },
  color: { type: Array, default: ["red"] },
  productType: {
    type: String,
    enum: ["", "newArrival", "topSelling"],
    default: "",
  },
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorDetails",
    default: null,
  },
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
  productStatus: {
    type: String,
    enum: ["pending", "Approved"],
    default: null,
  },
});

module.exports = mongoose.model("Product", productSchema);

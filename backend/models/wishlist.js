const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    // like: { type: Boolean, default: false }
});

module.exports = mongoose.model("Likes", wishlistSchema);
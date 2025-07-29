const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    number: String,
    email: { type: String, required: true, unique: true },
    password: String,
    confirmPassword: String,
    role: { type: String, enum: ["admin", "user"] },
    address: String,
    image: String,
    subscriptionId: { type: String, default: null },
    isBlocked: { type: Boolean, default: false },
    isSubscribe: {
      type: String,
      enum: ["basic", "premium", "free"],
      default: "free",
    },
    resetToken: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

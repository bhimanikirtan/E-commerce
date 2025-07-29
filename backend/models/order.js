const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderData: {
      products: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, default: 1 },
          size: String,
          color: String,
        },
      ],
    },
    total: Number,
    currency: { type: String, default: "INR" },
    info: {
      address: String,
      pincode: Number,
      city: String,
      country: String,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "canceled"],
      default: "pending",
    },

    paymentDetail: {
      paymentIntentId: { type: String },
      paymentMode: { type: String },
      paymentStatus: {
        type: String,
        enum: ["pending", "complete", "failed"],
        default: "pending",
      },
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);

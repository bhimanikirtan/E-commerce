const mongoose = require("mongoose");

const vendorDetailSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companylogo: { type: String },
    businessname: { type: String },
    businessemail: { type: String },
    businessnumber: { type: Number },
    businessAddress: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: Number },
      country: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VendorDetails", vendorDetailSchema);

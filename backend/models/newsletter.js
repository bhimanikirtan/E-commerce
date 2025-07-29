const mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NewsLetter", newsLetterSchema);

const express = require("express");
const router = express.Router();
const { verifyToken, checkBlockUser } = require("../middleware/auth");
const { addVendorDetails } = require("../controllers/vendorController");

router.post("/addVendorDetails", verifyToken, checkBlockUser, addVendorDetails);

module.exports = router;

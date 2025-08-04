const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { verifyToken, checkBlockUser } = require("../middleware/auth");
const {
  addVendorDetails,
  getVendorDetails,
  updateVendorDetails,
  getAllVendorProducts,
} = require("../controllers/vendorController");

router.post(
  "/addVendorDetails",
  upload.single("companylogo"),
  verifyToken,
  checkBlockUser,
  addVendorDetails
);
router.get("/getVendorDetails", verifyToken, checkBlockUser, getVendorDetails);
router.put(
  "/updateVendorDetails",
  upload.single("companylogo"),
  verifyToken,
  checkBlockUser,
  updateVendorDetails
);
router.get("/getVendorProducts", verifyToken, getAllVendorProducts);

module.exports = router;

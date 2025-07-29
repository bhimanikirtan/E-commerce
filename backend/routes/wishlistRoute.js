const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth")
const { addWishlist, getUserWishlist, deleteUserWishlist } = require("../controllers/wishlistController");




router.post("/addWishlist/:id", verifyToken, addWishlist)
router.delete("/deleteWishlist/:id", verifyToken, deleteUserWishlist);
router.get("/getWishlist/", verifyToken, getUserWishlist);




module.exports = router
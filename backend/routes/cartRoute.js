const express = require("express");
const router = express.Router();
const { verifyToken, checkBlockUser } = require("../middleware/auth");
const {
  createCart,
  getAllCart,
  removeFromCart,
  clearCart,
  plusProduct,
  minusProduct,
} = require("../controllers/cartController");

router.post("/add", verifyToken, checkBlockUser, createCart);
router.get("/get", verifyToken, checkBlockUser, getAllCart);
router.delete("/delete/:id", verifyToken, checkBlockUser, removeFromCart);
router.delete("/clear/", verifyToken, checkBlockUser, clearCart);
router.get("/plus/:id", verifyToken, checkBlockUser, plusProduct);
router.get("/minus/:id", verifyToken, checkBlockUser, minusProduct);

module.exports = router;

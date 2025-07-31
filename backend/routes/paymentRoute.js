const express = require("express");
const router = express.Router();
const {
  payment,
  handleSubscription,
  invoice,
} = require("../controllers/paymentController");
const { webhook } = require("../controllers/webhookController");
const { verifyToken } = require("../middleware/auth");

router.post("/sendPayment", verifyToken, payment);
router.get("/invoice_download/:session_id", invoice);
router.post("/handleSubscription", verifyToken, handleSubscription);

router.post("/webhook", webhook);

module.exports = router;

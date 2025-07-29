const express = require("express");
const router = express.Router();
const {
  addNewSletter,
  getAllEmails,
  deleteEmail,
  sendNewsLetter,
} = require("../controllers/sletterController");

router.post("/addSletter", addNewSletter);
router.get("/getEmails", getAllEmails);
router.delete("/deleteEmail/:id", deleteEmail);
router.post("/sendNewsLetter", sendNewsLetter);

module.exports = router;

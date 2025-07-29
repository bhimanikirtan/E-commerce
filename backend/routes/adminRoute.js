const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAllUsers,
  updateUserByAdmin,
  getAllCount,
  blockUser,
  getAllOrdersAdmin,
  updateOrdersAdmin,
  getAnalyticsData,
} = require("../controllers/adminController");

router.get("/AllUsers", upload.single("image"), getAllUsers);
router.put("/blockUser/:id", blockUser);
router.put("/updateUserByAdmin/:id", upload.single("image"), updateUserByAdmin);
router.get("/getAllCount", getAllCount);
router.get("/getAllOrder", getAllOrdersAdmin);
router.get("/analytics", getAnalyticsData);
router.put("/updateOrder/:id", updateOrdersAdmin);

module.exports = router;

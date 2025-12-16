const express = require("express");
const {
  signup,
  signin,
  updatePassword,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update-password", verifyToken, updatePassword);

module.exports = router;

const express = require("express");
const { createUser, verifyPayment } = require("../controller/user");
const router = express.Router();

router.post("/register", createUser);
router.post("/verify", verifyPayment);

module.exports = router;

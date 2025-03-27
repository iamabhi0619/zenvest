const express = require("express");
const { createUser, verifyPayment, paymentWebhook } = require("../controller/user");
const router = express.Router();

router.post("/register", createUser);
router.post("/verify", verifyPayment);
router.post("/webhook", paymentWebhook)

module.exports = router;

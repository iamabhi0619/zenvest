const express = require("express");
const { createUser } = require("../controller/user");
const { paymentWebhook } = require("../controller/payment");
const router = express.Router();

router.post("/register", createUser);
// router.post("/verify", verifyPayment);
router.post("/webhook", paymentWebhook)

module.exports = router;

const express = require("express");
const { createUser, getUser, getAllUsers, verifyTicket } = require("../controller/user");
const { paymentWebhook } = require("../controller/payment");
const router = express.Router();

router.post("/register", createUser);
// router.post("/verify", verifyPayment);
router.post("/webhook", paymentWebhook);

router.get("/verify", verifyTicket)

// Add routes for getting users
router.get("/user", getUser); // Route to get a single user by query parameters
router.get("/users", getAllUsers); // Route to get all users

module.exports = router;

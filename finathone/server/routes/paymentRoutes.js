const express = require("express");
const {
  createOrder,
  verification,
} = require("../controller/paymentController");

const router = express.Router();

router.post("/", createOrder);
router.post("/webhook", verification);

module.exports = router;

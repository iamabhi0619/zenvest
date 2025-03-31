const express = require("express");
const { generateStyledQR } = require("../controller/utility/QrCode");
const router = express.Router();

router.get("/qrcode", generateStyledQR)

module.exports = router;
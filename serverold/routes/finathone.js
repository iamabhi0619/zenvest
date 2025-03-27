const express = require("express");
const {getUserData, certificate} = require("../controller/finathone")

const router = express.Router();

router.get("/:id",getUserData);
router.get('/ap/certificate', certificate)

module.exports = router;

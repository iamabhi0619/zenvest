const express = require("express");
const FinathonController = require("../controller/finathone");
const { authenticateToken } = require("../service/authMiddelware");
const routes = express.Router();

routes.get("/", authenticateToken, FinathonController.getAllUsers);
// routes.post("/", userController.createOne);
// routes.put("/:id", userController.updateOne);
// routes.delete("/:id", userController.deleteOne);
// routes.get("/:id",authenticateToken, userController.getOne);
exports.routes = routes;

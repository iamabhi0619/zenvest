const express = require("express");
const routes = express.Router();
const memberController = require("../controller/member");

routes.get("/", memberController.getAllMember);
routes.post("/singup", memberController.createMember);
// routes.post("/login", memberController.loginMember);
// routes.post("/forget", memberController.forgetPassword);
// routes.post("/reset/:id", memberController.resetPassword);

exports.routes = routes;
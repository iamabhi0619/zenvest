const express = require("express");
const routes = express.Router();
const memberController = require("../controller/member");
const { authenticateToken } = require("../service/authMiddelware");

routes.get("/", memberController.getAllMember);
routes.get("/data", authenticateToken, memberController.getDetails);
routes.post("/singupcore", memberController.createCoreMember);
routes.post("/singupmember", memberController.createMember);
routes.post("/login", memberController.loginMember);
routes.post("/forget", memberController.forgetPassword);
routes.post("/reset/:id", memberController.resetPassword);

exports.routes = routes;
import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authentication.js";
import { authorizeUser } from "../middlewares/authorization.js";

const router = express.Router();

router.get("/profile", verifyToken, userController.getUser);
router.get("/:userId", verifyToken, authorizeUser, userController.getUser);
router.put("/:userId", verifyToken, authorizeUser, userController.updateUser);
router.delete("/:userId", verifyToken, authorizeUser, userController.deleteUser);

export default router;
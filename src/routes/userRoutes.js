import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authentication.js";
import { authorizeUser } from "../middlewares/authorization.js";
import { restrictRoleUpdate } from "../middlewares/roleAuthorization.js";

const router = express.Router();

router.get("/profile", verifyToken, userController.getUser);
router.get("/:userId", verifyToken, authorizeUser, userController.getUser);
router.put("/:userId", verifyToken, authorizeUser, restrictRoleUpdate, userController.updateUser);
router.delete("/:userId", verifyToken, authorizeUser, userController.deleteUser);
router.put("/update-password/:userId", verifyToken, authorizeUser, userController.updatePassword);

export default router;
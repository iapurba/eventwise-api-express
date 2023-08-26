import express from "express";
import * as userController from "../controllers/userController.js";
import { requireLogin } from "../middlewares/authentication.js";
import { authorizeUser } from "../middlewares/authorization.js";
import { restrictRoleUpdate } from "../middlewares/roleAuthorization.js";

const router = express.Router();

router.get("/profile", requireLogin, userController.getUser);
router.get("/:userId", requireLogin, authorizeUser, userController.getUser);
router.put("/:userId", requireLogin, authorizeUser, restrictRoleUpdate, userController.updateUser);
router.delete("/:userId", requireLogin, authorizeUser, userController.deleteUser);
router.put("/update-password/:userId", requireLogin, authorizeUser, userController.updatePassword);

export default router;
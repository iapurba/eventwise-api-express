import express from 'express';
import * as userController from '../controllers/userController.js';
import { requireLogin } from '../middlewares/authenticationMiddleware.js';
import { authorizeUser } from '../middlewares/userAuthMiddleware.js';
import { requireRole, restrictRoleUpdate } from '../middlewares/roleAuthMiddleware.js';
import constants from '../utils/constants.js';

const router = express.Router();

router.get('/profile', requireLogin, userController.getUser);
router.get('/:userId', requireLogin, authorizeUser, userController.getUser);
router.put('/:userId', requireLogin, authorizeUser, restrictRoleUpdate, userController.updateUser);
router.delete('/:userId', requireLogin, requireRole(constants.ROLE_ADMIN), userController.deleteUser);
router.put('/update-password/:userId', requireLogin, authorizeUser, userController.updatePassword);

export default router;
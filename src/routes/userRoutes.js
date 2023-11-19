import express from 'express';
import * as userController from '../controllers/userController.js';
import { requireLogin } from '../middlewares/authenticationMiddleware.js';
import { authorizeUser } from '../middlewares/userAuthMiddleware.js';

const router = express.Router();

router.get('/me', requireLogin, userController.getUserProfile);
router.get('/:userId', requireLogin, userController.getUser);
router.put('/:userId', requireLogin, authorizeUser, userController.updateUser);
router.delete('/:userId', requireLogin, userController.deleteUser);
router.put('/update-password/:userId', requireLogin, authorizeUser, userController.updatePassword);

export default router;
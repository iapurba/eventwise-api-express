import express from 'express';
import * as userAuthController from '../controllers/userAuthController.js';

const router = express.Router();

router.post('/register', userAuthController.registerUser);
router.post('/login', userAuthController.loginUser);

export default router;
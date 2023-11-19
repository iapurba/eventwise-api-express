import express from 'express';
import * as userAuthController from '../controllers/userAuthController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', userAuthController.registerUser);
router.post('/login', userAuthController.loginUser);
router.post('/request-otp', authController.requestOTP);
router.post('/verify-otp', authController.verifyOTP);

export default router;
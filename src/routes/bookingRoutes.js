import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { requireLogin } from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.post('/events/:eventId/bookings', requireLogin, bookingController.bookTickets);

export default router;
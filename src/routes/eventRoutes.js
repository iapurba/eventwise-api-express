import express from 'express';
import * as eventController from '../controllers/eventController.js';
import { requireLogin } from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEventById);
router.get('/:eventId/tickets', eventController.getEventTickets);

export default router;
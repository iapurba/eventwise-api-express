import express from 'express';
import * as eventController from '../controllers/eventController.js';
import * as ticketController from '../controllers/ticketController.js';

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEventById);
router.get('/:eventId/tickets', ticketController.getEventTickets);

export default router;
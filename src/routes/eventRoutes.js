import express from 'express';
import * as eventController from '../controllers/eventController.js';
import { requireLogin } from '../middlewares/authenticationMiddleware.js';
import * as publisherEventController from '../controllers/publishers/publisherEventControllers.js';

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/:eventId', eventController.getEvent);

router.post('/',
    requireLogin,
    publisherEventController.createEvent
);

router.put('/:eventId',
    requireLogin,
    publisherEventController.updateEvent
);

router.delete('/:eventId',
    requireLogin,
    publisherEventController.deleteEvent
);

router.post('/:eventId/tickets',
    requireLogin,
    publisherEventController.addTicketsAndPublish
);

router.get('/:eventId/tickets', eventController.getEventTickets);

export default router;
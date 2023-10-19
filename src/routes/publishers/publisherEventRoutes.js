import express from 'express';
import { eventController, ticketController } from '../../controllers/publishers/index.js';
import { requireLogin } from '../../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.post('/',
    requireLogin,
    eventController.createEvent
);

router.put('/:eventId',
    requireLogin,
    eventController.updateEvent
);

router.delete('/:eventId',
    requireLogin,
    eventController.deleteEvent
);

router.post('/:eventId/tickets',
    requireLogin,
    ticketController.addTickets
);

router.put('/tickets/:ticketId',
    requireLogin,
    ticketController.updateTicket
);

router.delete('/tickets/:ticketId',
    requireLogin,
    ticketController.deleteTicket
);

export default router;
import Ticket from '../models/Ticket.js';
import Event from '../models/Event.js';
import constants from '../utils/constants.js';
import { processTicketDocument } from '../utils/processors/ticketDocumentProcessor.js';

export const getEventTickets = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: constants.EVENT_NOT_FOUND });
        }
        // Find tickets from the Ticket collection 
        const tickets = await Ticket.find({ eventId: eventId });
        const processedTickets = tickets.map(ticket => processTicketDocument(ticket));
        res.status(200).json(processedTickets);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};
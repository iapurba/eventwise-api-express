import Ticket from '../../models/Ticket.js';
import Event from '../../models/Event.js';

const addTickets = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: constants.EVENT_NOT_FOUND });
        }

        const tickets = req.body.tickets;

        if (!Array.isArray(tickets) || tickets.length === 0) {
            return res.status(400).json({ error: "Invalid Tickets" });
        }

        const totalQuantity = tickets.reduce((acc, ticket) => acc + ticket.quantity, 0);

        if (totalQuantity === 0) {
            return res.status(400).json({ error: "Invalid ticket quantites" })
        }

        // Add tickets to Ticket collection
        await Ticket.insertMany(tickets.map(ticket => ({ eventId, ...ticket })));

        // Update the event's published status
        event.status = 'published';
        await event.save();

        res.status(200).json({ message: "Event published successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not publish event" });
    }
};

export default {
    addTickets,
};
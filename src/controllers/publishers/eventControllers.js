import Event from '../../models/Event.js';
import Ticket from '../../models/Ticket.js';
import constants from '../../utils/constants.js';

export const createEvent = async (req, res) => {
    const eventData = req.body;
    const publisher = req.user.userId;
    try {
        const event = new Event({
            ...eventData,
            createdBy: publisher
        });
        await event.save();
        res.status(201).json({ message: constants.EVENT_CREATED, data: event });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: constants.STATUS_BAD_REQUEST });
    }
};

export const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const eventDataToUpdate = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, eventDataToUpdate, { new: true });
        console.log(updatedEvent);
        res.status(200).json({ message: constants.EVENT_UPDATED, data: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: "Update Failed" });
    }
};

export const deleteEvent = async (req, res) => {
    const eventId = req.event._id;
    try {
        await Event.findByIdAndDelete(eventId);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: "Deletion Failed" });
    }
};

export const addTicketsAndPublish = async (req, res) => {
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
        event.published = true;
        await event.save();

        res.status(200).json({ message: "Event published successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not publish event" });
    }
};
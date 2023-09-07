import Event from "../models/Event.js";
import Ticket from "../models/Ticket.js";
import constants from "../utils/constants.js";

export const getEvents = async (req, res) => {
    const {
        category,
        location,
        eventType,
        startDate,
        endDate
    } = req.query;

    try {
        const eventQuery = {};

        if (category) eventQuery.category = category;
        if (location) eventQuery.city = location;
        if (eventType) eventQuery.eventType = eventType;

        if (startDate && endDate) {
            eventQuery.date = { $gte: startDate, $lte: endDate };
        } else if (startDate) {
            eventQuery.date = { $gte: startDate };
        } else if (endDate) {
            eventQuery.data = { $lte: endDate };
        }

        const events = await Event.find(eventQuery);
        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};

export const getEvent = async (req, res) => {
    const eventId = req.params.eventId;
    try {
        const event = await Event.findById(eventId);
        console.log(event);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ error: constants.EVENT_NOT_FOUND });
    }
};

export const getEventTickets = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: constants.EVENT_NOT_FOUND });
        }
        // Find tickets from the Ticket collection 
        const tickets = await Ticket.findMany({ eventId: eventId });

        res.status(200).json(tickets);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};
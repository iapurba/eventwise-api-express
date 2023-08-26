import Event from "../models/Event.js";
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
        res.status(200).json({ data: events });

    } catch (error) {
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};

export const createEvent = async (req, res) => {
    const eventData = req.body;
    const organizer = req.user.userId;
    try {
        const event = new Event({
            ...eventData,
            organizer: organizer
        });
        await event.save();
        res.status(201).json({ message: constants.EVENT_CREATED, data: event });

    } catch (error) {
        res.status(400).json({ error: constants.STATUS_BAD_REQUEST });
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

export const updateEvent = async (req, res) => {
    const eventId = req.event._id;
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
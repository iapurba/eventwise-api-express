import Event from '../models/Event.js';
import constants from '../utils/constants.js';

export const isAuthorizedEventOrganizer = async (req, res, next) => {
    const eventId = req.params.eventId;
    const userId = req.user.userId;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: constants.EVENT_NOT_FOUND });
        }
        if (event.organizer.toString() !== userId) {
            return res.status(403).json({
                error: {
                    message: constants.AUTH_ACCESS_DENIED,
                    details: constants.STATUS_FORBIDDEN_DETAILS
                }
            });
        }
        req.event = event;
        next();

    } catch (error) {
        if (error.name === 'CastError') {
            res.status(400).json({ error: constants.STATUS_BAD_REQUEST });
        } else {
            res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
        }
    }
}
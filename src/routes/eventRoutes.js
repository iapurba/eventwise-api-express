import express from "express";
import * as eventController from "../controllers/eventController.js";
import { requireLogin } from "../middlewares/authenticationMiddleware.js";
import { requireRole } from "../middlewares/roleAuthMiddleware.js";
import constants from "../utils/constants.js";
import { isAuthorizedEventOrganizer } from "../middlewares/organizerAuthMiddleware.js";

const router = express.Router();

router.get("", eventController.getEvents);
router.get("/:eventId", eventController.getEvent);

router.post("/",
    requireLogin,
    requireRole(constants.ROLE_ORGANIZER),
    eventController.createEvent
);

router.put("/:eventId",
    requireLogin,
    requireRole(constants.ROLE_ORGANIZER),
    isAuthorizedEventOrganizer,
    eventController.updateEvent
);

router.delete("/:eventId",
    requireLogin,
    requireRole(constants.ROLE_ORGANIZER),
    isAuthorizedEventOrganizer,
    eventController.deleteEvent
);

export default router;
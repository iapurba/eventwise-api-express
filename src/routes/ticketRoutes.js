import express from "express";
import * as ticketController from "../controllers/ticketController.js";

const router = express.Router();

router.get("/:ticketId", ticketController.getTicket);
router.put("/:ticketId", ticketController.updateTicket);
router.delete("/:ticketId", ticketController.deleteTicket);

export default router;
import Ticket from "../models/Ticket.js";
import constants from "../utils/constants.js";

export const getTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json(ticket);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};

export const updateTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const updatedData = req.body;
        const updatedTicket =
            await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true });

        if (!updatedTicket) {
            return res.status(400).json({ error: "Error updating ticket" });
        }
        res.status(200).json({ message: "Ticket updated Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};

export const deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(204).send();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};
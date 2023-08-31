import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        requred: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    available: {
        type: Number,
        required: true,
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
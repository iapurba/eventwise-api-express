import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date },
    venue: { type: String },
    city: { type: String, },
    description: { type: String },
    capacity: { type: Number, required: true },
    eventType: {
        type: String,
        enum: ["physical", "online"],
        required: true,
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    category: { type: String },
});

const Event = new mongoose.model("Event", eventSchema);

export default Event;
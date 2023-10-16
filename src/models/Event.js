import mongoose, { Schema } from 'mongoose';
import Ticket from './Ticket';

const validatePincode = (pincode) => {
    return /^[0-9]{6}$/.test(pincode);
};

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    pincode: {
        type: String,
        validate: {
            validator: validatePincode,
            message: 'Pincode must be a 6-digit number.',
        },
    },
    country: String,
});

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        requred: true
    },
    endDate: Date,
    startTime: {
        type: String,
        requred: true
    },
    endTime: String,
    category: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        enum: ['physical', 'online'],
        required: true,
    },
    tickets: {
        type: [{
            ticketId: Schema.Types.ObjectId,
            price: Number
        }],
        required: true,
    },
    location: {
        venue: String,
        address: addressSchema,
        coordinates: {
            latitude: Number,
            longitude: Number,
        },
    },
    duration: String,
    image: String,
    artists: [String],
    performances: [
        {
            artist: String,
            startTime: String,
            endTime: String,
        }
    ],
    eventGuide: {
        ageRequirment: {
            type: Number,
            min: 0,
        },
        langauge: [String],
        livePerformance: {
            type: Boolean,
            default: false,
        }
    },
    tags: [String],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

eventSchema.set('timestamps', true);

eventSchema.pre('remove', async function (next) {
    try {
        await Ticket.deleteMany({ eventId: this._id })
        next();
    } catch (error) { next(error); }
});

const Event = new mongoose.model('Event', eventSchema);

export default Event;
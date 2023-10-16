import mongoose, { Schema } from 'mongoose';
import Ticket from './Ticket.js';

const validatePincode = (pincode) => {
    return /^[0-9]{6}$/.test(pincode);
};

const isRequiredForPhysicalEvent = function () {
    return this.eventType === 'physical';
};

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: isRequiredForPhysicalEvent,
    },
    city: {
        type: String,
        required: isRequiredForPhysicalEvent,
    },
    state: {
        type: String,
        required: isRequiredForPhysicalEvent,
    },
    pincode: {
        type: String,
        required: isRequiredForPhysicalEvent,
        validate: {
            validator: validatePincode,
            message: 'Pincode must be a 6-digit number.',
        },
    },
    country: {
        type: String,
        required: isRequiredForPhysicalEvent
    },
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
        venue: {
            type: String,
            required: isRequiredForPhysicalEvent,
        },
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
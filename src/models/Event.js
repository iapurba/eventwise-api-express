import mongoose, { Schema } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        enum: ['physical', 'online'],
        required: true,
    },
    location: {
        venue: {
            type: String,
            required: true,
        },
        address: {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                validate: {
                    validator: (value) => /^[0-9]{6}$/.test(value),
                    message: 'Pincode must be exactly 6 digits long.',
                },
                required: true,
            },
        },
        coordinates: {
            latitude: Number,
            longitude: Number,
        },
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: Date,
    duration: String,
    capacity: {
        type: Number,
        required: true,
    },
    image: String,
    artists: [String],
    performances: [
        {
            artist: String,
            startTime: String,
            endTime: String,
        }
    ],
    tags: [String],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Event = new mongoose.model('Event', eventSchema);

export default Event;
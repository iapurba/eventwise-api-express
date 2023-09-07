import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ticketId: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    bookingStatus: {
        type: String,
        required: true,
    },
    bookingReference: {
        referenceId: {
            type: String,
            // required: true,
        },
        qrCode: {
            type: String,
        }
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'UPI', 'Netbanking'],
            //   required: true,
        },
    },
    ticketDetails: {
        type: Schema.Types.Mixed,
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

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
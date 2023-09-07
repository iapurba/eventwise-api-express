import { customAlphabet } from 'nanoid';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';
import constants from '../utils/constants.js';
import QRCode from 'qrcode';

export const bookTickets = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const bookingsData = req.body.bookings;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: constants.EVENT_NOT_FOUND });
        }

        let grandTotal = 0;
        const bookingsToSave = [];

        for (const booking of bookingsData) {
            // 1. Find ticket and availablity
            const ticket = await Ticket.findById(booking.ticketId);
            if (!ticket || booking.quantity > ticket.availableQuantity) {
                return res.status(400).json({ error: 'Invalid Ticket type or quantity' });
            }
            // 2. generate ticket number
            const referenceId = generateBookingRef();
            // 3. generate QR code 
            const qrCode = await generateQRCode(eventId, ticket._id, booking.ticketType);
            // 4. calculate total amount
            const totalPrice = booking.quantity * ticket.price;
            grandTotal += totalPrice;
            // 5. Add tickets to bookedTickets
            const newBooking = new Booking({
                userId: req.user.userId,
                eventId: eventId,
                ticketId: ticket._id,
                ticketType: ticket.ticketType,
                quantity: booking.quantity,
                totalPrice,
                bookingStatus: 'Booked',
                bookingReference: {
                    referenceId,
                    qrCode,
                },
                paymentDetails: {
                    paymentMethod: 'UPI'
                }
            });

            bookingsToSave.push(newBooking);
            // 6. Update available tickets 
            ticket.availableQuantity -= booking.quantity;
            await ticket.save();
        }

        // create new booking object 
        const savedBookings = await Booking.insertMany(bookingsToSave);

        res.status(200).json({ message: 'Booking successful', data: savedBookings });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
}

const generateQRCode = async (data) => {
    try {
        const qrCode = await QRCode.toDataURL(data);
        return qrCode;

    } catch (error) {
        throw error;
    }
};

const generateBookingRef = () => {
    const nummericAlphabet = '0123456789';
    const generateNumericId = customAlphabet(nummericAlphabet, 8);
    const bookingRef = `BOK${generateNumericId()}`;
    return bookingRef;
};
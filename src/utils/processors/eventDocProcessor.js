import _ from 'lodash';
import { formatDate } from '../formatters/dateTimeFormatter.js';

const generateTicketPriceLabel = (ticketsArray) => {
    if (!ticketsArray.length) {
        return 'Free';
    };
    const sortedTickets = _.sortBy(ticketsArray, 'price');
    const startingPrice = sortedTickets[0].price;

    return sortedTickets.length > 1
        ? `${startingPrice} Onwards`
        : startingPrice ? startingPrice : 'Free';
}

export const proccessEventDocument = (eventDocument) => {
    const eventObj = eventDocument.toObject();
    const fieldsToExclude = [
        '_id',
        '__v',
        'createdAt',
        'createdBy',
        'updatedAt',
        'likes.users',
        'status',
        'tickets',
        'location.address._id',
    ];

    const id = eventObj._id;
    const startDate = formatDate(eventObj.startDate);
    const endDate = formatDate(eventObj.endDate)
    const startingPrice = generateTicketPriceLabel(eventObj.tickets);

    const processedEvent = _.omit(eventObj, fieldsToExclude);

    return { id, ...processedEvent, startDate, endDate, startingPrice };
};
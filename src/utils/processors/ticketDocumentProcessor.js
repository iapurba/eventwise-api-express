import _ from 'lodash';
import { formatDate } from '../formatters/dateTimeFormatter.js';

export const processTicketDocument = (ticketDocument) => {
    const ticketObj = ticketDocument.toObject();
    const fieldsToExclude = [
        '_id',
        '__v',
        'createdAt',
        'updatedAt',
        'quantity',
        'availableQuantity',
        'discounts',
    ];

    const processedTicket = _.omit(ticketObj, fieldsToExclude);
    const id = ticketObj._id;
    const startSaleDate = formatDate(ticketObj.startSaleDate);

    return { id, ...processedTicket, startSaleDate };
};
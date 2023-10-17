import _ from 'lodash';
import { formatDate } from './dateTimeFormatter.js';

export const formatEventResponse = (event) => {
    const fieldsToExclude = ['_id', 'createdAt', 'createdBy', 'updatedAt', '__v', 'likes.users', 'status'];
    const formattedEvent = _.omit(event, fieldsToExclude);
    const startDate = formatDate(event.startDate);
    const endDate = formatDate(event.endDate)
    return { ...formattedEvent, id: event._id, startDate, endDate };
};
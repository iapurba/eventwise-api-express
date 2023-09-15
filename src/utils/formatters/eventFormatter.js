import _ from 'lodash';
import { formatDate, formatTime12hr } from './dateTimeFormatter.js';

export const formatEventResponse = (event) => {
    const fieldsToExclude = ['__v', 'createdAt', 'updatedAt'];
    const formattedEvent = _.omit(event, fieldsToExclude);
    const date = formatDate(event.date);
    const startTime = formatTime12hr(event.date);
    return { ...formattedEvent, date, startTime };
};
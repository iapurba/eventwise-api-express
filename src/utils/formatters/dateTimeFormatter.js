export const formatDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Input must be a valid JavaScript Date object.');
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

export const formatTime12hr = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Input must be a valid JavaScript Date object.');
    }

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};
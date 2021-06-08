const moment = require('moment');

module.exports = {
    ifEqual: (a, b, options) => {
        return a === b ? options.fn(this) : options.inverse(this);
    },
    arrayCount: (array) => {
        return array.length;
    },
    formatDate: (date, locale, format) => {
        return moment(date).locale(locale).format(format);
    },
    formatDateTime: (dateTime, locale, format) => {
        return moment(dateTime).locale(locale).format(format);
    },
    formatCurrency: (value, locale, unit) => {
        const result = (value * 1000).toLocaleString(locale, {
            style: 'currency',
            currency: unit,
        });
        return result;
    },
    add: (a, b) => {
        return a + b;
    },
    minus: (a, b) => {
        return a - b;
    },
};

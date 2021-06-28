module.exports = (startDate, endDate) => {
    let dates = [];
    const theDate = new Date(startDate);

    while (theDate < endDate) {
        dates.push(new Date(theDate).toISOString());
        theDate.setDate(theDate.getDate() + 1);
    }

    return dates;
};

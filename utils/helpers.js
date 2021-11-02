function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth()
    const day = dateObj.getDate();

    return `${month}/${day}/${year}`;
}

module.exports = { formatDate }
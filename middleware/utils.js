let Utils = {

    /**
     * Take an ISO date object and convert it into a string that
     * looks more nicely formatted.
     */
    formatDate: (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = 12 <= hours ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    },

    /**
     * Takes a string and a maxLength and, if the string is longer than the maxLength,
     * it cuts the string down to a length of (maxLength-3) and appends '...' to the end.
     */
    shortenDescription: (description, maxLength) => {

        if (description.length < maxLength) {
            return description;
        }

        let shortDescription = description.substring(0, maxLength - 3);
        shortDescription += "...";

        return shortDescription;
    }
};

module.exports = Utils;

module.exports = {
    formatDate: function (date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = 12 <= hours ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    },
    shortenDescription: function (description, maxLength) {

        if (description.length < maxLength) {
            return description;
        }

        let shortDescription = description.substring(0, maxLength - 3);
        shortDescription += "...";

        return shortDescription;
    }
};

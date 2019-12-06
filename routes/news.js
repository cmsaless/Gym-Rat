const express = require('express');
const Update = require('../models/Update')

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

/*

When the user goes to the news page, they should see all the updates for the current month.
There should be a link/button at the bottom that, when clicked, displays all updates in a table
such as:

|  #  |     Date    |       Title       |  Subtitle  |    Description   |
=========================================================================
|  3  |  12/2/2019  |  Newest feature!  |     yes    |  blah blah blah  | 
|  2  |  11/27/2019 |  Newer feature!   |     yep    |  blah blah blah  | 
|  1  |  8/3/2018   |  New feauture!    |     yea    |  blah blah blah  | 

If there are too many updates, divide them by pages. Display about 10-20 a page?

Each entry in the table should be a link to the full details of the update.

*/

router.get('/', (req, res) => {

    let todaysDate = new Date();
    let strMonth = getMonthName(todaysDate.getMonth());
    let year = todaysDate.getFullYear();

    Update.find({ month: todaysDate.getMonth() }).exec((err, array) => {
        array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        array.forEach((update) => {
            let date = new Date(update.createdAt);
            update.createdAt = formatDate(date);
            update.description = shortenDescription(update.description, 300);
        });
        res.render('news', { month: strMonth, year: year, updates: array });
    });
});

router.get('/all', (req, res) => {

    // If the user doesn't put any limit on the number of updates, set the DB limit to 0.
    // When 0, the DB will just grab all the documents.
    let count = req.query.count == null ? 0 : parseInt(req.query.count);

    Update.find().limit(count).exec((err, array) => {
        array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        array.forEach((update) => {
            let date = new Date(update.createdAt);
            update.createdAt = formatDate(date);
            update.description = shortenDescription(update.description, 75);
        });
        res.render('newsAll', { updates: array })
    });
})

router.get('/add', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to access this page.' });
        return;
    }

    res.render('newsAdd');
});

router.post('/add', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to post to this endpoint.' });
        return;
    }

    const newUpdate = new Update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        author: req.user.username,
        createdAt: new Date().toString(),
        // month might be neccessary anymore? use caution
        month: new Date().getMonth().toString(),
        banner: req.body.banner,
    });

    newUpdate.save().then(savedUpdate => {
        res.redirect(302, '/news');
    }).catch(err => {
        console.log(err);
    })
});

/********** Helper Functions **********/

// NOTE: I'm going to want to move getMonthName and formatDate to a shared middleware directory
// so other routes can use them.

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
}

function shortenDescription(description, maxLength) {

    if (description.length < maxLength) {
        return description;
    }

    let shortDescription = description.substring(0, maxLength - 3);
    shortDescription += "...";

    return shortDescription;
}

function getMonthName(num) {
    let months = ["January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"];

    return months[num];
}
/********** End Helper Functions **********/

module.exports = router;
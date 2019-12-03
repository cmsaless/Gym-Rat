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
        array.sort((a, b) => b.createdAt - a.createdAt)
        res.render('news', { month: strMonth, year: year, updates: array });
    });
});

router.get('/add', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to access this page.' });
        return;
    }

    res.render('addUpdate');
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
        createdAt: new Date(),
        month: new Date().getMonth(),
        banner: req.body.banner,
    });

    newUpdate.save().then(savedUpdate => {
        res.redirect(302, '/news');
    }).catch(err => {
        console.log(err);
    })
});

/********** Helper Functions **********/
function getMonthName(num) {
    let month = "";
    switch (num) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February"
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April"
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }
    return month;
}
/********** End Helper Functions **********/

module.exports = router;
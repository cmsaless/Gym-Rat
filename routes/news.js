const express = require('express');
const Update = require('../models/Update')

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    let todaysDate = new Date();
    let month = getMonthName(todaysDate.getMonth());
    let year = todaysDate.getFullYear();
    res.render('news', { month: month, year: year });
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
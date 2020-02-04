const express = require('express');
const utils = require('../middleware/utils');
const Update = require('../models/Update')
const ObjectId = require('mongodb').ObjectId;

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
        let updateViews = [];
        array.forEach((update) => {
            let date = new Date(update.createdAt);
            let updateViewModel = {
                id: update._id,
                title: update.title,
                subtitle: update.subtitle,
                formattedDate : utils.formatDate(date),
                author: update.author,
                shortenedDescription: utils.shortenDescription(update.description, 300)
            };
            updateViews.push(updateViewModel);
        });
        res.render('news/news', { month: strMonth, year: year, updates: updateViews });
    });
});

router.get('/view/:id', (req, res) => {

    Update.findOne(ObjectId(req.params.id), (err, update) => {
        if (err) {
            console.log(err);
            return;
        }

        let updateViewModel = {
            id: update._id,
            title: update.title,
            subtitle: update.subtitle,
            description: update.description,
            author: update.author,
            createdAt: utils.formatDate(update.createdAt)
        };

        res.render('news/newsView', { user: req.user, update: updateViewModel });
    });
});

router.get('/all', (req, res) => {

    // If the user doesn't put any limit on the number of updates, set the DB limit to 0.
    // When 0, the DB will just grab all the documents.
    let count = req.query.limit == null ? 0 : parseInt(req.query.limit);

    Update.find().sort({ createdAt: -1 }).limit(count).exec((err, array) => {
        let updateViews = [];
        array.forEach((update) => {
            let updateViewModel = {
                id: update._id,
                formattedDate: utils.formatDate(update.createdAt),
                title: update.title,
                shortenedDescription: utils.shortenDescription(update.description, 75)
            };
            updateViews.push(updateViewModel);
        });
        let countStr = req.query.limit == null ? "All" : count;
        res.render('news/newsAll', { limit: countStr, updates: updateViews })
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
        createdAt: new Date(),
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

router.get('/edit/:id', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to access this page.' });
        return;
    }

    Update.findOne(ObjectId(req.params.id), (err, update) => {
        if (err) {
            console.log(err);
            return;
        }
        res.render('news/newsEdit', { update: update });
    });
});

router.post('/edit/:id', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to post to this endpoint.' });
        return;
    }

    Update.findOneAndUpdate({ _id: req.params.id },
        {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            modifiedBy: req.user.username,
            modifiedAt: new Date()
        }, 
        { new: true },
        (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            res.render('news/newsView', { user: req.user, update: doc });
        });
});

router.post('/delete/:id', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to post to this endpoint.' });
        return;
    }

});

/********** Helper Functions **********/
function getMonthName(num) {
    let months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September",
        "October", "November", "December"];

    return months[num];
}
/********** End Helper Functions **********/

module.exports = router;
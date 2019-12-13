const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.all('/*', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/', (req, res) => {
    res.render('profile');
});

router.get('/settings', (req, res) => {
    res.render('profileSettings')
});

router.post('/changeEmail', (req, res) => {
    User.findOneAndUpdate({_id : req.user._id},
        {
            email: req.body.email
        },
        {new: true},
        (err, doc) => {
            if (err) {
                console.log(err);
            }
            req.flash("successMessage", "Your email was changed to: " + doc.email);
            res.redirect('/profile/settings');
        });
});

router.post('/deleteUser', (req, res) => {

    // Delete everything to do with this user's workout data.


    res.redirect(302, '/');
});

router.post('/deleteData', (req, res) => {

    // Delete everything to do with this user.


    res.redirect(302, '/');
});

module.exports = router;
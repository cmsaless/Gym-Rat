const express = require('express');

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
    res.render('settings')
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
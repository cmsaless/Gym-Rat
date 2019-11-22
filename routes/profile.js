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

module.exports = router;
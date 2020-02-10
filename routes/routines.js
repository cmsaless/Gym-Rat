const express = require('express');
const User = require('../models/User');
const sanitize = require('mongo-sanitize');

const router = express.Router();

router.all('/*', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/', (req, res) => {
    res.render('routines/routines')
});

module.exports = router;
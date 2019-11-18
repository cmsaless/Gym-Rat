const express = require('express');
const User = require('../models/User');
const Validators = require('../public/functions/validators.js');
const passport = require('passport');
const {userAuthenticated} = require('./server functions/authentication.js');

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('profile', {user: req.user});
});


module.exports = router;
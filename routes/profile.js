const express = require('express');
const User = require('../models/User');
const Validators = require('../public/functions/validators.js');
const passport = require('passport');

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    const auth_user = res.locals.user;
    User.findOne({email: auth_user.email}).exec((err, user) => {
        if (err) console.log(err);
        res.render('profile', {user: user});
    }); 
});


module.exports = router;
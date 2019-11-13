const express = require('express');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/index', (req, res) => {
    res.locals.logged_in = true;
    res.render('index');
});

router.post('/register', (req, res) => {

    // ensure everything is there and valid (and the confirm-fields are same)

    // salt and hash that password (make new fn)

    // make a new User object to add to DB

    // submit to DB but check for exceptions

    const newUser = new User({
        username : req.body.username,
        email : req.body.email.toLowerCase(),
        password : req.body.password
    });

    newUser.save().then(savedUser => {
        console.log("success");
    }).catch(err => {
        console.log("failed");
    });
});

module.exports = router;
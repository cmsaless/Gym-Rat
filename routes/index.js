const express = require('express');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();

router.all('/*', (req, res ,next) => {
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
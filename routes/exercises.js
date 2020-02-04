const express = require('express');
const Validators = require("../middleware/validators");
const bcrypt = require('bcryptjs');
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
    res.render('exercises/exercises.hbs');
});

router.post('/add', (req, res) => {

    let exerciseName = sanitize(req.body.name);
    let exerciseType = sanitize(req.body.type);
    let exerciseCategory = sanitize(req.body.category);

    

});

module.exports = router;
const express = require('express');
const User = require('../models/User');
const Validators = require('./functions/validators.js');
const bcrypt = require('bcryptjs');
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

    // Ensure everything is there and valid.
    let allValid = checkAllValidators(req.body.username, 
                                      req.body.email, req.body.emailConfirm, 
                                      req.body.password, req.body.passwordConfirm);

    if (!allValid) {
        return;
    }

    // Salt and hash the password.
    let saltedAndHashedPswd = saltAndHashPassword(req.body.password);

    // Create a new User model object.
    const newUser = new User({
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: saltedAndHashedPswd
    });

    // Submit new User model to DB.
    newUser.save().then(savedUser => {
        console.log("success");
    }).catch(err => {
        console.log("failed");
    });
});

/********** Helper Functions **********/
function checkAllValidators(username, email, emailConf, pswd, pswdConf) {

    if (username.length < 3)                return false;
    if (email != emailConf)                 return false;
    if (!Validators.validateEmail(email))   return false;
    if (pswd != pswdConf)                   return false;
    if (!Validators.validatePassword(pswd)) return false;

    return true;
}

function saltAndHashPassword(password) {
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            return hash;
        });
    });
}
/********** End Helper Functions **********/

module.exports = router;
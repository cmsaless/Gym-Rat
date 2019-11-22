const express = require('express');
const User = require('../models/User');
const Validators = require('../public/functions/validators.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    if (res.locals.loggedIn) {
        res.render('dashboard');
    } else {
        res.render('index');
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);
        if (!user) return res.redirect('/stop');
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/profile');
        });
    })(req, res, next);
});

router.post('/register', (req, res) => {

    // Ensure everything is there and valid.
    let allValid = checkAllValidators(req.body.username,
        req.body.email, req.body.emailConfirm,
        req.body.password, req.body.passwordConfirm);

    if (!allValid) {
        return;
    }

    // Check to make sure that email isn't already in use

    // TODO: verify the email is real by sending an email to it

    // Salt and hash the password.
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {

            // Create a new User model object.
            const newUser = new User({
                username: req.body.username,
                email: req.body.email.toLowerCase(),
                password: hash
            });

            // Submit new User model to DB.
            newUser.save().then(savedUser => {
                res.redirect(302, '/');
            }).catch(err => {
                console.log("failed: ", err);
            });
        });
    });

    // TODO: Send a 'please verify' email to confirm user owns this
});

/********** Helper Functions **********/
function checkAllValidators(username, email, emailConf, pswd, pswdConf) {

    if (username.length < 3) return false;
    if (email != emailConf) return false;
    if (!Validators.validateEmail(email)) return false;
    if (pswd != pswdConf) return false;
    if (!Validators.validatePassword(pswd)) return false;

    return true;
}
/********** End Helper Functions **********/

module.exports = router;
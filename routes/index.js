const express = require('express');
const User = require('../models/User');
const Update = require('../models/Update');
const Validators = require('../middleware/validators.js');
const utils = require('../middleware/utils');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const sanitize = require('mongo-sanitize');

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {

    if (req.isAuthenticated()) {

        // Get the 3 most recent updates (regardless if they match the month or not) and
        // display them on the dashboard.

        Update.find().sort({ createdAt: -1 }).limit(3).exec((err, array) => {
            let updateViews = [];
            array.forEach((update) => {
                let updateViewModel = {
                    id: update._id,
                    formattedDate: utils.formatDate(update.createdAt),
                    title: update.title,
                    shortenedDescription: utils.shortenDescription(update.description, 75),
                    author: update.author
                };
                updateViews.push(updateViewModel);
            });
            res.render('index/dashboard', { updates: updateViews });
        });
    } else {
        res.render('index/index');
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash('errorMessage', 'Your email/password combination was not found.')
            return res.redirect(302, '/');
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect(302, '/');
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(302, '/');
});

router.post('/register', (req, res) => {

    // Sanitize our inputs.
    let username = sanitize(req.body.username);
    let email = sanitize(req.body.email);
    let emailConfirm = sanitize(req.body.emailConfirm);
    let password = sanitize(req.body.password);
    let passwordConfirm = sanitize(req.body.passwordConfirm);

    // Ensure everything is there and valid.
    let allValid = checkAllValidators(
        username,
        email,
        emailConfirm,
        password,
        passwordConfirm
    );

    if (!allValid) {
        req.flash("errorMessage", "Invalid input!");
        res.redirect(302, '/');
        return;
    }

    // Check if that email is already in the DB (an account exists).
    User.findOne({ email: email }).then((err, res) => {
        if (err) return;
        if (res) {
            req.flash("errorMessage", "An account with that email already exists!");
            res.redirect(302, '/');
            return;
        }
    })

    // TODO: verify the email is real by sending an email to it.

    // Salt and hash the password.
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return;
        bcrypt.hash(password, salt, (err, hash) => {

            if (err) return;

            // Create a new User model object.
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: hash
            });

            // Submit new User model to DB.
            newUser.save().then(savedUser => {
                passport.authenticate('local')(req, res, () => {
                    res.redirect(302, '/');
                })
            }).catch(err => {
                return;
            });
        });
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
/********** End Helper Functions **********/

module.exports = router;
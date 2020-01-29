const express = require('express');
const Validators = require("../middleware/validators");
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sanitize = require('mongo-sanitize');
var ObjectId = require('mongodb').ObjectID;

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
    res.render('profileSettings')
});

router.post('/changeEmail', (req, res) => {

    let isValid = Validators.validateEmail(req.body.email);

    if (!isValid) {
        req.flash("errorMessage", "The new email you entered is not valid");
        res.redirect("/profile/settings");
        return;
    }

    User.findOneAndUpdate({ _id: req.user._id },
        {
            email: req.body.email
        },
        { new: true },
        (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            req.flash("successMessage", "Your email was changed to: " + doc.email);
            res.redirect("/profile/settings");
        });
});

router.post('/changeUsername', (req, res) => {

    let username = sanitize(req.body.username);

    let isValid = 2 < username.length;

    if (!isValid) {
        req.flash("errorMessage", "The new username you entered is not valid");
        res.redirect(302, "/profile/settings");
        return;
    }

    User.findOneAndUpdate({ _id: req.user._id },
        {
            username: username
        },
        { new: true },
        (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
            req.flash("successMessage", "Your username was changed to: " + doc.username);
            res.redirect("/profile/settings");
        });
});

router.post('/changePassword', (req, res) => {

    // 1. check if password matches password-confirm
    // 2. check is new password is valid
    // 3. bcrypt it
    // 4. pass into DB

    let currentPassword = sanitize(req.body.currentPassword);
    let newPassword = sanitize(req.body.newPassword);
    let newPasswordConfirm = sanitize(req.body.newPasswordConfirm);

    bcrypt.compare(currentPassword, req.user.password, (err, result) => {

        if (err) return;
        if (!result) {
            req.flash('errorMessage', 'You did not correctly enter your current password.')
            res.redirect(302, '/profile/settings');
            return;
        }

        let matching = newPassword == newPasswordConfirm;
        let isValid = Validators.validatePassword(newPassword);

        if (!matching) {
            req.flash('errorMessage', 'Your passwords need to match.');
            res.redirect(302, '/profile/settings');
            return;
        }

        if (!isValid) {
            req.flash("errorMessage", "The new password you entered is not valid");
            res.redirect("/profile/settings");
            return;
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
                User.findOneAndUpdate({ _id: req.user._id },
                    {
                        password: hash
                    },
                    (err, doc) => {
                        if (err) return;
                        req.flash("successMessage", "Your password was successfully changed!");
                        res.redirect("/profile/settings");
                    });
            });
        });
    });
});

router.post('/deleteUser', (req, res) => {

    // TODO: Delete all user data first

    console.log(req.user._id);
    console.log(req.user);

    try {
        User.deleteOne({ "_id": ObjectId(req.user._id) }, (err, res) => {
            if (err) console.log(err);
            console.log(res);
        });
    } catch (e) {
        console.log(e);
    }

    res.redirect(302, '/');
});

router.post('/deleteData', (req, res) => {

    // Delete everything to do with this user.

    res.redirect(302, '/');
});

module.exports = router;
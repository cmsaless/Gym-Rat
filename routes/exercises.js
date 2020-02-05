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
    res.render('exercises/exercises.hbs', {exercises : req.user.exercises.sort(compareExercises)});
});

router.post('/add', (req, res) => {

    let exerciseName = sanitize(req.body.name);
    let exerciseType = sanitize(req.body.type);
    let exerciseCategory = sanitize(req.body.category);

    let exerciseToInsert = { 'name': exerciseName, 'type': exerciseType, 'category': exerciseCategory }

    User.updateOne({ _id: req.user._id },
        {
            $push: { exercises: exerciseToInsert }
        },
        (err, raw) => {
            if (err) return;
            res.redirect(302, 'back');
        }
    );

});


/********** Helper Functions **********/
function compareExercises(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1
    }
    return 0;
}
/********** End Helper Functions **********/

module.exports = router;
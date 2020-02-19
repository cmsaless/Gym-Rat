const express = require('express');
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

    let trainingCategory = req.query.training;

    let retArr = []

    if (trainingCategory != null) {
        retArr = req.user.exercises.filter((exericse) => exericse.category.toLowerCase() == trainingCategory.toLowerCase());
    } else {
        retArr = req.user.exercises;
    }

    trainingCategory = trainingCategory == null ? "All" : trainingCategory.charAt(0).toUpperCase() + trainingCategory.slice(1);

    res.render('exercises/exercises.hbs', { sortedBy: trainingCategory, exercises: retArr.sort(compareExercises) });
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

router.post('/edit', (req, res) => {
    res.redirect('back');
    return;
    User.update(
        {_id : req.user._id},
        {$pull : {exercises : {}}}
    );
});

router.post('/delete', (req, res) => {
    User.update(
        { _id: req.user._id },
        { $pull: { exercises: { _id: req.body._id } } }, (err, result) => {
            if (err) console.log(err);
            res.redirect(302, '/exercises');
        });
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
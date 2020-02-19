const express = require('express');
const User = require('../models/User');
const sanitize = require('mongo-sanitize');
const ParseRoutines = require('../middleware/parseRoutines');
const Utils = require('../middleware/utils.js');
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();

router.all('/*', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/', (req, res) => {

    let routineViewModels = [];

    for (let i = 0; i < req.user.routines.length; ++i) {
        const routine = req.user.routines[i];
        routineViewModels.push(ParseRoutines.createViewModel(routine));
    }

    res.render('routines/routines', { routines: routineViewModels })
});

router.get('/add', (req, res) => {
    res.render('routines/routinesAdd')
})

router.post('/add', (req, res) => {

    let newRoutine = ParseRoutines.createRoutine(req.body);

    User.updateOne({ _id: req.user._id },
        {
            $push: { routines: newRoutine }
        },
        (err, raw) => {
            if (err) return;
            res.redirect(302, '/routines')
        }
    )
});

router.get('/edit/:id', (req, res) => {

    let userRoutine = req.user.routines.find(routine => routine._id.equals(ObjectId(req.params.id)));
    userRoutine.createdAt = Utils.formatDate(userRoutine.createdAt);

    res.render('routines/routinesEdit', { routine: userRoutine });
});

router.post('/edit', (req, res) => {

    let updatedRoutine = ParseRoutines.createRoutine(req.body);

    console.log(updatedRoutine);

    User.findOneAndUpdate(
        { _id: req.user._id, 'routines._id': ObjectId(req.body._id) },
        { $set: { 'routines.$': updatedRoutine } }
    );

    res.redirect(302, '/routines');
});

router.post('/delete', (req, res) => {
    User.update(
        { _id: req.user._id },
        { $pull: { routines: { _id: req.body._id } } }, (err, result) => {
            if (err) return;
            res.redirect(302, '/routines');
        });
});

module.exports = router;
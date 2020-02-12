const express = require('express');
const User = require('../models/User');
const sanitize = require('mongo-sanitize');
const ParseRoutines = require('../middleware/parseRoutines');
const Utils = require('../middleware/utils.js');

const router = express.Router();

router.all('/*', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/', (req, res) => {

    let routinesViewModel = [];

    for (let i=0; i<req.user.routines.length; ++i) {
        const routine = req.user.routines[i];
        console.log(routine);
        routineViewModel = {
            inUse: routine.inUse ? '✅' : '❌',
            name: routine.name,
            numOfExercises: routine.exercises.length,
            numOfTimesCompleted: routine.numOfTimesCompleted,
            createdAtFormatted: Utils.formatDate(routine.createdAt)
        };
        routinesViewModel.push(routineViewModel);
    }

    res.render('routines/routines', { routines: routinesViewModel })
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

})

module.exports = router;
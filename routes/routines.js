const express = require('express');
const User = require('../models/User');
const sanitize = require('mongo-sanitize');
const ParseRoutines = require('../middleware/parseRoutines');

const router = express.Router();

router.all('/*', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/', (req, res) => {
    res.render('routines/routines')
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
const express = require('express');
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

    let routineViewModels = [];

    for (let i = 0; i < req.user.routines.length; ++i) {
        const routine = req.user.routines[i];
        routineViewModels.push(ParseRoutines.createViewModel(routine));
    }

    res.render('workouts/workouts.hbs', { routines: routineViewModels })
});

router.get('/:id', (req, res) => {

    console.log(req.params.id);

});

module.exports = router;
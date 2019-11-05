const express = require('express');
const passport = require('passport');

const router = express.Router();
module.exports = router;

router.all('/*', (req, res ,next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('stop', {again : false});
});

router.get('/again', (req, res) => {
    res.render('stop', {again : true});
});

// new feature is done!
// wow what a great feature!

// im in the mood for a dance!
const express = require('express');
const passport = require('passport');

const router = express.Router();
module.exports = router;

router.all('/*', (req, res ,next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('info', {id : req.query.q});
});

router.get('/:id', (req, res) => {
    res.render('info', {id : req.params.id});
});
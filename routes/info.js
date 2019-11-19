const express = require('express');

const router = express.Router();

router.all('/*', (req, res ,next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('info', {id : req.query.q});
});

router.get('/:id', (req, res) => {
    res.render('info', {id : req.params.id});
});

module.exports = router;
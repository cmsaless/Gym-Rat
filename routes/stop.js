const express = require('express');

const router = express.Router();

router.all('/*', (req, res ,next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('stop', {again : false});
});

router.get('/again', (req, res) => {
    var b = req.query.b == 'true' ? true : false;
    res.render('stop', {again : b});
});

module.exports = router;

// new feature is done!
// wow what a great feature!
// im in the mood for a dance!
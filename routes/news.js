const express = require('express');

const router = express.Router();

router.all('/*', (req, res ,next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('news');
});

module.exports = router;
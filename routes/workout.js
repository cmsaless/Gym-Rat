const express = require('express');

const router = express.Router();

router.all('/*', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    } else {
        next();
    }
});

module.exports = router;
const express = require('express');

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('news');
});

router.get('/add', (req, res) => {

    if (!req.isAuthenticated() || req.user == null || !req.user.isAdmin) {
        res.render('denied');
        return;
    }

    res.render('addUpdate');
});

router.post('/add', (req, res) => {
    console.log(req.body.title);
    console.log(req.body.subtitle);
    console.log(req.body.description);
    console.log(req.body.banner);
});

module.exports = router;
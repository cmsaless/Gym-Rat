const express = require('express');
const Update = require('../models/Update')

const router = express.Router();

router.all('/*', (req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    res.render('news');
});

router.get('/add', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to access this page.' });
        return;
    }

    res.render('addUpdate');
});

router.post('/add', (req, res) => {

    if (!req.isAuthenticated() || !req.user.isAdmin) {
        res.render('denied', { message: 'You are not authorized to post to this endpoint.' });
        return;
    }

    const newUpdate = new Update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        author: req.user.username,
        banner: req.body.banner,
    });

    newUpdate.save().then(savedUpdate => {
        res.redirect(302, '/news');
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;
const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');

const router = new Router();

router.get('/In', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('Transfer/transferIn');
});

router.get('/Out', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('Transfer/transferOut');
});

module.exports = router;
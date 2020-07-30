const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');

const router = new Router();

router.get('/In', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('Transfer/transferIn');
});

router.post('/In', async function (req, res, next) {
    const AccountId = req.body.AccountId;
    const money = req.body.money;
    const UserId = req.session.userId;

    const result = await Account.transferIn(UserId, money, AccountId);
    if(result==true) {
        res.redirect('/profile');
    }

    res.redirect('/');
});

router.get('/Out', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('Transfer/transferOut');
});

module.exports = router;
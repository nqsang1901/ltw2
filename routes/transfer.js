const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');
const TransactionLog = require('../services/TransactionLog');
const TransactionDetail = require('../services/TransactionDetail');
const GetTime = require("../services/GetTime");

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
    const numtransaction = await TransactionLog.numberOfTransactionLog() + 1;
    if(result==false) {
        TransactionLog.add(numtransaction, UserId, AccountId, 2);
        res.redirect('/');
    }
    TransactionLog.add(numtransaction, UserId, AccountId, 1);
    TransactionDetail.add(await TransactionDetail.numberOfTransactionDetail() + 1, numtransaction, new Date(GetTime.getTheCurrentTime()), money, null, 1,1)
    res.redirect('/profile');
});

router.get('/Out', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('Transfer/transferOut');
});

module.exports = router;
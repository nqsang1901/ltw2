const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');
const TransactionLog = require('../services/TransactionLog');
const TransactionDetail = require('../services/TransactionDetail');
const User = require('../services/User');
const GetTime = require("../services/GetTime");
const Email = require('../services/Email');
const crypto = require('crypto');

const router = new Router();

router.get('/In', function (req, res, next) {
    if (typeof req.session.userId == "undefined") {
        res.redirect('/login');
    }
    res.render('Transfer/transferIn');
});

router.get('/confirmemail', function (req, res, next) {
    if (typeof req.session.userId == "undefined") {
        res.redirect('/login');
    }
    res.render('Transfer/confirmemail');
});

router.post('/confirmemail', async function (req, res, next) {
    const token = req.body.confirmemail;
    const UserId = req.session.userId;
    const transaction = await TransactionLog.findTransactionLogByToken(token);
    console.log(transaction);
    if(!transaction) {
        res.render('Transfer/confirmemail', {message : "Mã xác thực không đúng"});
    } else if(new Date(GetTime.getTheCurrentTime()) - new Date(transaction.TransactionDate) > 100000) {
        res.render('Transfer/confirmemail', {message : "Mã xác thực đã hết hạn"});
    }
    console.log(new Date(GetTime.getTheCurrentTime()) - new Date(transaction.TransactionDate));

    const result = await Account.transferIn(UserId, transaction.money, transaction.AccountId);
    transaction.token = null;
    if(result==false) {
        transaction.TransactionStatusId = 2;
        transaction.save();
        return res.redirect('/');
    }
    transaction.TransactionStatusId = 1;
    transaction.save();
    // TransactionDetail.add(await TransactionDetail.count() + 1, numtransaction, new Date(GetTime.getTheCurrentTime()), inforTransaction.money, null, 1,1);
    res.redirect('/profile');
});

router.post('/In', async function (req, res, next) {
    const inforTransaction = req.body;
    const UserId = req.session.userId;
    const user = await User.findUserById(UserId);

    if(User.verifyPassword(inforTransaction.password, user.PassWord) == false){
        res.render('Transfer/transferIn', { message : 'Mật khẩu không khớp!' });
    } else {
        const token = crypto.randomBytes(3).toString('hex').toUpperCase();
        //await Email.send(user.EmailAddress, 'Mã xác thực chuyển tiền', 'Mã xác thực chuyển tiền của bạn là: ' + token);
        const numtransaction = await TransactionLog.count() + 1;
        TransactionLog.add(numtransaction, UserId, inforTransaction.AccountId, 2, inforTransaction.money, token, new Date(GetTime.getTheCurrentTime()));
        res.redirect('/transfer/confirmemail');
    }
});

router.get('/Out', function (req, res, next) {
    if (!req.session.userId == false) {
        res.redirect('/login');
    }
    res.render('Transfer/transferOut');
});

module.exports = router;
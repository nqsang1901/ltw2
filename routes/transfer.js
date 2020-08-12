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

router.get('/confirmemail', async function (req, res, next) {
    console.log(req.body.token);
    // const inforTransaction = req.body;
    // const UserId = req.session.userId;
    // const user = await User.findUserById(UserId);




    // const result = await Account.transferIn(UserId, inforTransaction.money, inforTransaction.AccountId);
    // const numtransaction = await TransactionLog.count() + 1;
    // if(result==false) {
    //     TransactionLog.add(numtransaction, UserId, inforTransaction.AccountId, 2);
    //     res.redirect('/');
    // }
    // TransactionLog.add(numtransaction, UserId, inforTransaction.AccountId, 1);
    // TransactionDetail.add(await TransactionDetail.count() + 1, numtransaction, new Date(GetTime.getTheCurrentTime()), inforTransaction.money, null, 1,1);
    // res.redirect('/profile');
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
        res.render('Transfer/confirmemail', {token, money : inforTransaction.money, accountid : inforTransaction.AccountId});
    }
});

router.get('/Out', function (req, res, next) {
    if (!req.session.userId == false) {
        res.redirect('/login');
    }
    res.render('Transfer/transferOut');
});

module.exports = router;
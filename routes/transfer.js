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
const tz = require('timezone');
const asia = tz(require('timezone/Asia'));

const router = new Router();

router.get('/In', function (req, res, next) {
    if (typeof req.currentUser == "undefined") {
        res.redirect('/login');
    }
    res.render('Transfer/transferIn');
});

router.get('/confirmemail', function (req, res, next) { // Trang xác thực gmail
    if (typeof req.session.userId == "undefined") {
        res.redirect('/login');
    }
    res.render('Transfer/confirmemail');
});

router.post('/confirmemail', async function (req, res, next) { // Xử lý xác thực gmail
    const token = req.body.confirmemail;
    const UserId = req.session.userId;
    const user = await User.findUserById(UserId);
    const account =await Account.findAccountByUserIdPay(UserId);
    const transaction = await TransactionLog.findTransactionLogByToken(token);
    if (!transaction) {
        res.render('Transfer/confirmemail', { message: "Mã xác thực không đúng" });
    } else if (new Date(GetTime.getTheCurrentTime()) - new Date(transaction.TransactionDate) > 100000) {
        res.render('Transfer/confirmemail', { message: "Mã xác thực đã hết hạn" });
    }

    const result = await Account.transferIn(UserId, transaction.money, transaction.AccountId);
    const account1 = await Account.findAccountByAcountId(transaction.AccountId);
    const user1= await User.findUserById(account1.UserId);
    transaction.token = null;
    console.log(result);
    if (result == false) {
        transaction.TransactionStatusId = 2;
        transaction.save();
        return res.redirect('/');
    }
    transaction.TransactionStatusId = 1; // cai account van in ra binh thuong a m 
    transaction.save();
    console.log(account.AccountId);
    console.log(String(account.CurrentBalance-transaction.money));
    console.log("toi day r");
    await Email.send(user.EmailAddress, 'Refundbank' ,await asia(new Date(GetTime.getTheCurrentTime()) , '%d/%m/%Y- %H:%M:%S', 'Asia/Ho_Chi_Minh')+ 
    ' Tài khoản '+ account.AccountId +':-'+ String( transaction.money) + ' ,Số dư: ' + String(account.CurrentBalance-transaction.money));
    await Email.send(user1.EmailAddress, 'Refundbank' ,await asia(new Date(GetTime.getTheCurrentTime()) , '%d/%m/%Y- %H:%M:%S', 'Asia/Ho_Chi_Minh')+ 
    ' Tài khoản '+ account1.AccountId +':+'+ String( transaction.money) + ' ,Số dư: ' + String(account1.CurrentBalance+transaction.money));
    console.log("toi day 2");
    res.redirect('/profile');
});

router.post('/In', async function (req, res, next) {
    const inforTransaction = req.body; // AccountId, money, password, content
    const UserId = req.session.userId;
    const user = await User.findUserById(UserId);
    const accountget = await Account.findAccountByAcountId(inforTransaction.AccountId);

    if (User.verifyPassword(inforTransaction.password, user.PassWord) == false) {
        res.render('Transfer/transferIn', { message: 'Mật khẩu không khớp!' });
    } else if(accountget == null || accountget.AccountTypeId != 1) {
        res.render('Transfer/transferIn', { message: 'Tài khoản chuyển đến không hợp lệ!' });
    }else if(inforTransaction.money < 10000 || inforTransaction.money > 5000000) {
        res.render('Transfer/transferIn', { message: 'Số tiền không hợp lệ!' });
    } else {
        const token = crypto.randomBytes(3).toString('hex').toUpperCase();
        await Email.send(user.EmailAddress, 'Mã xác thực chuyển tiền', 'Mã xác thực chuyển tiền của bạn là: ' + token);
        const numtransaction = await TransactionLog.count() + 1;
        await TransactionLog.add(numtransaction, UserId, inforTransaction.AccountId, 2, 1, inforTransaction.money, token, new Date(GetTime.getTheCurrentTime()), accountget.UserId);
        TransactionDetail.add(await TransactionDetail.count() + 1, numtransaction, inforTransaction.content, 1);
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
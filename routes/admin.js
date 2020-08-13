const { Router } = require('express');
const Account = require('../services/Account');
const User = require('../services/User');
const TransactionLog = require('../services/TransactionLog');
const TransactionDetail = require('../services/TransactionDetail');
const random = require('random');
var dateFormat = require('dateformat');
const GetTime = require("../services/GetTime");

const router = new Router();

async function checkAdmin(req, res) {
    if (typeof req.session.userId == "undefined") {
        res.redirect('/login');
    } else if (req.currentUser.UserTypeId != 2) {
        res.redirect('/login');
    }
}

router.get('/user', async function (req, res) {
    checkAdmin(req,res);
    const users = await User.findAllUser();
    res.render('Admin/table', { users, dateFormat });
});

router.get('/account', async function (req, res) {
    checkAdmin(req,res);
    const accounts = await Account.findAll();
    res.render('Admin/index', { accounts, dateFormat });
});

router.get('/recharge', async function (req, res) {
    checkAdmin(req,res);
    const accounts = await Account.findAll();
    res.render('Admin/recharge', { accounts, dateFormat });
});

router.get('/rechargeAccount/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    console.log(AccountId);
    const accounts = await Account.findAccountByAcountId(AccountId);
    console.log(accounts);

    res.render('Admin/rechargeAccount', { accounts, dateFormat });

});

router.post('/rechargeAccount/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const money = parseFloat(req.body.moneyInput, 10);
    const recharge = await Account.rechargeAccount(money, parseInt(AccountId, 10));
    if (recharge == false) {
        const message = "Số tiền không hợp lệ!"
        const accounts = await Account.findAccountByAcountId(AccountId);

        res.render('Admin/rechargeAccount', { accounts, dateFormat, message });
    }
    if (recharge == true) {
        // var TransactionLogId;
        // TransactionLogId = await random.int(10000000, 99999999);
        // TransactionId, UserId, AccountId, TransactionStatusId, type, money, token, TransactionDate
        const accountget = await Account.findAccountByAcountId(AccountId);
        await TransactionLog.add(await TransactionLog.count() + 1, req.session.userId, AccountId, 2, 2, money, null, new Date(GetTime.getTheCurrentTime()));
        await TransactionDetail.add(await TransactionDetail.count() + 1, await TransactionLog.count(), 'NAP TIEN', 1, accountget.UserId);
    }
    res.redirect('/admin/recharge');
});

router.get('/:AccountId/edit', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const account = await Account.findAccountByAcountId(AccountId);

    res.render('userprofile', { account, dateFormat });
});
router.get('/:AccountId/edit/argee', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const account = await Account.findAccountByAcountId(AccountId);
    account.AccountStatusTypeId = 2;
    account.save();

    res.redirect('/admin');
});

// EDIT
router.get('/:UserId', async function (req, res) {
    const { UserId } = req.params;

    res.render('Admin/edituser', { dateFormat });
});

module.exports = router;
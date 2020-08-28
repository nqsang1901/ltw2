const { Router } = require('express');
const Account = require('../services/Account');
const User = require('../services/User');
const TransactionLog = require('../services/TransactionLog');
const TransactionDetail = require('../services/TransactionDetail');
const Email = require('../services/Email');
const random = require('random');
var dateFormat = require('dateformat');
const GetTime = require("../services/GetTime");
const tz = require('timezone');
const asia = tz(require('timezone/Asia'));

function formatMoney(n, currency) {
    return n.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' ' + currency;
}

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
    res.render('Admin/table', { users });
});

router.post('/user', async function (req, res) {
    checkAdmin(req,res);
    const fname = req.body.fname;
    const users = await User.findAllUserByFname(fname);
    res.render('Admin/table', { users });
});

router.get('/account', async function (req, res) {
    checkAdmin(req,res);
    const accounts = await Account.findAll();
    res.render('Admin/index', { accounts, asia, formatMoney });
});

router.post('/account', async function (req, res) {
    checkAdmin(req,res);
    const statusAccount = req.body.statusAccount;
    const typeAccount = req.body.typeAccount;
    console.log(statusAccount, typeAccount);
    const accounts = await Account.findAccountByStatusAndTYpe( statusAccount, typeAccount);
    res.render('Admin/index', { accounts, asia, formatMoney });
});

router.get('/recharge', async function (req, res) {
    checkAdmin(req,res);
    const accounts = await Account.findAll();
    res.render('Admin/recharge', { accounts, asia, formatMoney});
});

router.get('/rechargeAccount/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const accounts = await Account.findAccountByAcountId(AccountId);

    res.render('Admin/rechargeAccount', { accounts, dateFormat });

});
router.get('/withdrawAccount/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const accounts = await Account.findAccountByAcountId(AccountId);

    res.render('Admin/withdrawAccount', { accounts, dateFormat });

});
router.get('/edituser/:UserId', async function (req, res) {
    checkAdmin(req,res);
    const { UserId } = req.params;
    const user = await User.findUserById(UserId);
    res.render('Admin/edituser',{user, asia});
});
router.get('/watchuser/:UserId', async function (req, res) {
    checkAdmin(req,res);
    const { UserId } = req.params;
    const user = await User.findUserById(UserId);
    const payaccount = await Account.findAccountByTypeAccount(UserId, 1);
    const savingaccount = await Account.findAccountByTypeAccount(UserId, 2);
    res.render('Admin/watchUser',{user, asia,payaccount, savingaccount,formatMoney});
});
router.get('/accountverification/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const account = await Account.findAccountByAcountId(AccountId);
    const user = await User.findUserById(account.UserId);
    res.render('Admin/accountverification',{user});
});
router.post('/accountverification/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const account = await Account.findAccountByAcountId(AccountId);
    account.AccountStatusTypeId =2;
    account.save();
    res.redirect('/admin/account');
});
router.get('/lockuser/:UserId', async function (req, res) {
    checkAdmin(req,res);
    const { UserId } = req.params;
    const user = await User.findUserById(UserId);
    const account = await Account.findAccountByUserId(UserId);
    const users = await User.findAllUser();
    if(user.UserStatusId == 3){
        user.UserStatusId =2;
        user.save();
        res.redirect('/admin/user');
    }
    else{
        user.UserStatusId =3;
        user.save();
        account.forEach(function(i){
            i.AccountStatusTypeId = 3;
            i.save();
        });
        res.redirect('/admin/user');
    }
});
router.get('/lockaccount/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const account = await Account.findAccountByAcountId(AccountId);
    const user = await User.findUserById(account.UserId);
    if(account.AccountStatusTypeId == 3){
        if(user.UserStatusId!=3){
        account.AccountStatusTypeId =2;
        account.save();
        }
        else{

        }
        res.redirect('/admin/account');
    }
    else{
        account.AccountStatusTypeId =3;
        account.save();
        res.redirect('/admin/account');
    }
});
router.post('/edituser/:UserId', async function (req, res) {
    checkAdmin(req,res);
    const { UserId } = req.params;
    const user = await User.findUserById(UserId);
    user.UserName = req.body.userName;
    user.IdentityNumber = req.body.identity;
    user.Address = req.body.address;
    user.DateOfBirth = req.body.date;
    user.save();
    res.redirect('/Admin/user');
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
    const numtransaction = await TransactionLog.numberOfTransactionLog() + 1;
    const account =await Account.findAccountByAcountId(AccountId);
    const UserId =account.UserId;
    const user = await User.findUserById(UserId);
    console.log("123");
    if (recharge == true) {
        // var TransactionLogId;
        // TransactionLogId = await random.int(10000000, 99999999);
        // TransactionId, UserId, AccountId, TransactionStatusId, type, money, token, TransactionDate
        const accountget = await Account.findAccountByAcountId(AccountId);
        await TransactionLog.add(await TransactionLog.count() + 1, req.session.userId, AccountId, 1, 3, money, null, new Date(GetTime.getTheCurrentTime()), accountget.UserId);
        await TransactionDetail.add(await TransactionDetail.count() + 1, await TransactionLog.count(), 'NAP TIEN', 1);
        await Email.send(user.EmailAddress, 'Refundbank' ,asia(new Date(GetTime.getTheCurrentTime()) , '%d/%m/%Y- %H:%M:%S', 'Asia/Ho_Chi_Minh')+ ' Tài khoản '+ account.AccountId +':+'+ String(money) + ' ,Số dư: ' + String(account.CurrentBalance+money));
    }
    res.redirect('/admin/recharge');
});

router.post('/withdrawAccount/:AccountId', async function (req, res) {
    checkAdmin(req,res);
    const { AccountId } = req.params;
    const money = parseFloat(req.body.moneyInput, 10);
    const recharge = await Account.withdrawAccount(money, parseInt(AccountId, 10));
    if (recharge == false) {
        const message = "Số tiền không hợp lệ hoặc số dư không đủ";
        const accounts = await Account.findAccountByAcountId(AccountId);

        res.render('Admin/rechargeAccount', { accounts, dateFormat, message });
    }
    const numtransaction = await TransactionLog.numberOfTransactionLog() + 1;
    const account =await Account.findAccountByAcountId(AccountId);
    const UserId =account.UserId;
    const user = await User.findUserById(UserId);
    if (recharge == true) {
        // var TransactionLogId;
        // TransactionLogId = await random.int(10000000, 99999999);
        // TransactionId, UserId, AccountId, TransactionStatusId, type, money, token, TransactionDate
        const accountget = await Account.findAccountByAcountId(AccountId);
        await TransactionLog.add(await TransactionLog.count() + 1, req.session.userId, AccountId, 1, 2, money, null, new Date(GetTime.getTheCurrentTime()), accountget.UserId);
        await TransactionDetail.add(await TransactionDetail.count() + 1, await TransactionLog.count(), 'RUT TIEN', 1);
        await Email.send(user.EmailAddress, 'Refundbank: ' ,asia(new Date(GetTime.getTheCurrentTime()) , '%d/%m/%Y- %H:%M:%S', 'Asia/Ho_Chi_Minh')+ ' Tài khoản '+ account.AccountId +':-'+ String(money) + ' ,Số dư: ' + String(account.CurrentBalance-money));
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
const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const Account = require('../services/Account');
var dateFormat = require('dateformat');
const tz = require('timezone');
const TransactionLog = require('../services/TransactionLog');
const asia = tz(require('timezone/Asia'));

function formatMoney(n, currency) {
    return n.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' ' + currency;
}

const router = new Router();

router.get('/', async function getProfile(req, res, next) {
    if (typeof req.currentUser == "undefined") {
        res.redirect('/login');
    }
    const payaccount = await Account.findAccountByTypeAccount(req.currentUser.UserId, 1);
    const savingaccount = await Account.findAccountByTypeAccount(req.currentUser.UserId, 2);
    console.log(req.session.UserId);
    const transactionLog = await TransactionLog.findTransactionLogByUserId(req.session.userId);
    console.log(transactionLog);
    res.render('profile', {payaccount, savingaccount, asia, formatMoney, transactionLog});
});

router.post('/', upload.single('avatar'), asyncHandler(async function(req, res, next) {
    console.log(req.file);
    const UserId = req.currentUser.UserId;
    const user = await User.findUserById(UserId);
    if(user && user.UserId === req.currentUser.UserId) {
        await user.chanceAvatar(req.file.filename);
    }
    res.redirect('/profile');
}));
router.get('/LockAcc/:UserID', async function (req, res) {
    const {userId}= req.params;
    const accounts = await Account.findAccountByTypeAccount(userId,2);
    console.log(accounts);
    const CurrentBalance = accounts.CurrentBalance;
    const DueDate = accounts.DueDate;
    const MoneyInterest = accounts.MoneyInterest;
    const SavingMoney = accounts.SavingMoney;
    
    const Money = null;
    const BoolDue = null;
    if(moment().calendar()>=DueDate)
    {
        Money = CurrentBalance + SavingMoney+MoneyInterest;
        BoolDue = 1;
    }
    else if(moment().calendar()<DueDate)
    {
        Money = CurrentBalance+SavingMoney;
        BoolDue=2;
    }
    
    res.redirect('LockAccountSaving',{accounts,formatMoney});
});
module.exports = router;
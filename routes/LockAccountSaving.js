const { Router } = require('express');
const  moment  = require('moment');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');
const User = require('../services/User');

function formatMoney(n, currency) {
    return n.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' ' + currency;
}

const router = new Router();

router.get('/LockAcc',async function getProfileAccount(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    const accounts = await Account.findAccount(req.session.userId);
    const accountId = accounts.AccountId;
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
    
    res.render('LockAccountSaving',{accountId, CurrentBalance, SavingMoney, MoneyInterest,DueDate, Money, BoolDue,formatMoney});
});

module.exports = router;

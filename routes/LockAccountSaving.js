const { Router } = require('express');
const  moment  = require('moment');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');
const User = require('../services/User');

function formatMoney(n, currency) {
    return n.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + ' ' + currency;
}

const router = new Router();

router.get('/',async function (req, res, next) {
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

const { Router } = require('express');
const  moment  = require('moment');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');
const TransactionLog = require('../services/TransactionLog');
const TransactionDetail = require('../services/TransactionDetail');

const router = new Router();

router.get('/', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('SavingDeposit');
});
router.post('/', async function (req, res, next) {
    const AccountId = req.body.AccountId;
    const money = req.body.money;
    const Maturity = req.body.Maturity;
    const Duedate = req.body.Duedate;
    const UserId = req.session.userId; 
    var interest = null;
    var Duedates = null;
    // const moneyMaturity;
    if(Duedate==1)
    {
        interest = 4/100;
        Duedates = moment().add(30, 'days').calendar();
    }
    else if(Duedate==6)
    {
        interest= 5/100;
        Duedates = moment().add(183, 'days').calendar();
    }
    else if(Duedate==12)
    {
        interest = 7/100;
        Duedates = moment().add(365, 'days').calendar();
    }
    else if(Duedate==24)
    {
        interest = 7.5/100;
        Duedates = moment().add(730, 'days').calendar();
    }else 
    {
        interest=8/100;
        Duedates = moment().add(1095, 'days').calendar();
    }
    const result = await Account.Deposit(UserId,AccountId ,money,interest,Duedates,Maturity);
    const inforTransaction = req.body;
    const token = null;
    var userget= UserId;
    var date =moment();
    const numtransaction = await TransactionLog.count() + 1;
    await TransactionLog.add(numtransaction, UserId, AccountId, 2, 2, inforTransaction.money, token,date ,userget );
    TransactionDetail.add(await TransactionDetail.count() + 1, numtransaction, inforTransaction.content, 1);
    setInterval (function(){Account.Interest(UserId,AccountId,interest,money)}, 60000);
    
    if(result==true ) {
        res.redirect('/profile');
        
    }
    res.redirect('/');
});
module.exports = router;

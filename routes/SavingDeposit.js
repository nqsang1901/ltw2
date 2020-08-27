const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');
const SYNC_INTERVALSENDMAIL = Number(process.env.SYNC_INTERVALSENDMAIL || 1440000);

const router = new Router();

router.get('/', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('SavingDeposit');
});
router.post('/Deposit', async function (req, res, next) {
    const AccountId = req.body.AccountId;
    const money = req.body.money;
    const Maturity = req.body.Maturity;
    const Duedate = req.body.Duedate;
    const UserId = req.session.userId; 
    const interest = 0;
    const Duedates = null;
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
    const Int = await Account.Interest(UserId,AccountId,interest,money);
    setInterval(Int, SYNC_INTERVALSENDMAIL);
    
    if(result==true) {
        res.redirect('/profile');
    }

    res.redirect('/');
});
module.exports = router;

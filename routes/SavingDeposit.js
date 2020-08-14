const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const Account = require('../services/Account');
const SYNC_INTERVALSENDMAIL = Number(process.env.SYNC_INTERVALSENDMAIL || 1440000);

const router = new Router();

router.get('/Deposit', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('SavingDeposit');
});
router.post('/Deposit', async function (req, res, next) {
    const AccountId = req.body.AccountId;
    const money = req.body.money;
    const Maturity = req.body.Maturity;
    const UserId = req.session.userId; 
    // const interest;
    
    
    if(Maturity==1)
    {
        interest = 4;
    }
    else if(Maturity==6)
    {
        interest= 5;
    }
    else if(Maturity==12)
    {
        interest = 7;
    }
    else if(Maturity==24)
    {
        interest = 7.5;
    }else 
    {
        interest=8;
    }
    const result = await Account.Deposit(UserId,AccountId ,money,interest);
    const Int = await Account.Interest(UserId,AccountId,interest,money);
    setInterval(Int, SYNC_INTERVALSENDMAIL);

    if(result==true) {
        res.redirect('/profile');
    }

    res.redirect('/');
});
module.exports = router;

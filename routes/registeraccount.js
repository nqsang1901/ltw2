const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const Account = require('../services/Account');
const random = require('random');
const GetTime = require("../services/GetTime");

const router = new Router();

router.get('/', async function (req, res, next) {
    if (typeof req.currentUser == "undefined") {
        res.redirect('/login');
    }

    const savingsaccount = await Account.findAccountByTypeAccount(req.session.userId, 1);
    const paymentaccount = await Account.findAccountByTypeAccount(req.session.userId, 2);
    res.render('registeraccount', {savingsaccount, paymentaccount});
});

router.get('/:id/:AccountTypeId', asyncHandler(async function (req, res) {
    const { id, AccountTypeId } = req.params;

    // const accountcheck = await Account.findAccountByUserId(id);
    // if (accountcheck[0] != null) {
    //     if (accountcheck.length >= 2) {
    //         return res.redirect('/registeraccount');
    //     } else {
    //         if (accountcheck[0].AccountTypeId == AccountTypeId) {
    //             return res.redirect('/registeraccount');
    //         }
    //     }
    // }

    var AccountId;
    while (true) {
        AccountId = await random.int(100000, 999999);
        console.log(AccountId);
        const accountcheck = await Account.findAccountByAcountId(AccountId);
        if (!accountcheck) {
            break;
        }
    }
    await Account.add(AccountId, id, 0, new Date(GetTime.getTheCurrentTime()), 1, AccountTypeId);
    req.session.userId = id;
    res.redirect('/registeraccount');
}));

module.exports = router;
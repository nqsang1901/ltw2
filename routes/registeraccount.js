const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const Account = require('../services/Account');
const random = require('random');
const GetTime = require("../services/GetTime");

const router = new Router();

router.get('/', function (req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    res.render('registeraccount');
});
// saving account

router.get('/:id/:AccountTypeId', asyncHandler(async function (req, res) {
    const { id, AccountTypeId } = req.params;

    const accountcheck = await Account.findAccountByUserId(id);
    if (accountcheck[0]) {
        if (accountcheck.length >= 2) {
            return res.redirect('/registeraccount');
        } else {
            // const checkAcountType = await acountcheck.for(acount => acount == AcountTypeId);
            if (accountcheck[0].AccountTypeId == AccountTypeId) {
                return res.redirect('/registeraccount');
            }
        }
    }

    let AccountId; 0
    while (true) {
        AccountId = random.int(100000, 999999);
        const accountcheck = await Account.findAccountByAcountId(AccountId);
        if (!accountcheck) {
            break;
        }
    }
    await Account.add(AccountId, 0, GetTime.getTheCurrentTime(), id, 1, 1, AccountTypeId);
    req.session.userId = id;
    res.redirect('/');
}));

module.exports = router;
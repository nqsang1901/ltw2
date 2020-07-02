const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const Acount = require('../services/Acount');
const random = require('random');
const GetTime = require("../services/GetTime");

const router = new Router();

router.get('/', function (req, res, next) {
    res.render('registeraccount');
});
// saving account

router.get('/:id/:AcountTypeId', asyncHandler(async function (req, res) {
    const { id, AcountTypeId } = req.params;

    const acountcheck = await Acount.findAcountByUserId(id);
    if (acountcheck[0]) {
        if (acountcheck.length >= 2) {
            return res.redirect('/registeraccount');
        } else {
            // const checkAcountType = await acountcheck.for(acount => acount == AcountTypeId);
            if (acountcheck[0].UserId == AcountTypeId) {
                return res.redirect('/registeraccount');
            }
        }
    }

    let AcountId; 0
    while (true) {
        AcountId = random.int(100000, 999999);
        const acountcheck = await Acount.findAcountByAcountId(AcountId);
        if (!acountcheck) {
            break;
        }
    }
    await Acount.add(AcountId, 0, GetTime.getTheCurrentTime(), id, 1, 1, AcountTypeId);
    req.session.userId = id;
    res.redirect('/');
}));

module.exports = router;
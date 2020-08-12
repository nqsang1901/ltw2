const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const Account = require('../services/Account');
const TranSactionLog = require('./TransactionLog');
const random = require('random');
const GetTime = require("../services/GetTime");

const router = new Router();

// saving account

router.post('/rechargeAccount/:AccountId', asyncHandler(async function (req, res) {
    if (Account.rechargeAccount == true) {
        var TransactionLogId;

        TransactionLogId = await random.int(10000000, 99999999);      
        await TransactionLog.add(TransactionLogId,AccountId,1,1,0);
    }
}));

module.exports = router;
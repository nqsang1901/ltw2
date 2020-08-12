const { Router } = require('express');
const Account = require('../services/Account');
const User = require('../services/User');
const TransactionLog = require('../services/TransactionLog');
const random = require('random');
var dateFormat = require('dateformat');

const router = new Router();

router.get('/user', async function (req, res) {
    const users = await User.findAllUser();
    res.render('Admin/table', { users, dateFormat });
});

router.get('/account', async function (req, res) {
    const accounts = await Account.findAllAccount();
    res.render('Admin/index', { accounts, dateFormat });
});

router.get('/recharge', async function (req, res) {
    const accounts = await Account.findAllAccount();
    res.render('Admin/recharge', { accounts, dateFormat });
});

router.get('/rechargeAccount/:AccountId', async function (req, res) {
    const { AccountId } = req.params;
    console.log(AccountId);
    const accounts = await Account.findAccountByAcountId(AccountId);
    console.log(accounts);

    res.render('Admin/rechargeAccount', { accounts, dateFormat });

});

router.post('/rechargeAccount/:AccountId', async function (req, res) {
    const { AccountId } = req.params;
    const money = parseFloat(req.body.moneyInput, 10);
    console.log(AccountId);
    console.log(req.body.moneyInput);
    const recharge = await Account.rechargeAccount(money, parseInt(AccountId, 10));
    if (recharge == false) {
        const message = "Số tiền không hợp lệ!"
        const accounts = await Account.findAccountByAcountId(AccountId);

        res.render('Admin/rechargeAccount', { accounts, dateFormat, message });
    }
    if (recharge == true) {
        var TransactionLogId;
        TransactionLogId = await random.int(10000000, 99999999);      
        await TransactionLog.add(TransactionLogId,AccountId,1,1,0);
    }
    res.redirect('/admin/recharge');
});

router.get('/:AccountId/edit', async function (req, res) {
    const { AccountId } = req.params;
    const account = await Account.findAccountByAcountId(AccountId);

    res.render('userprofile', { account, dateFormat });
});
router.get('/:AccountId/edit/argee', async function (req, res) {
    const { AccountId } = req.params;
    const account = await Account.findAccountByAcountId(AccountId);
    account.AccountStatusTypeId = 2;
    account.save();

    res.redirect('/admin');
});

module.exports = router;
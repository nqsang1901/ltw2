const { Router } = require('express');
const Account = require('../services/Account');
const User = require('../services/User');
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
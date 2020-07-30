const { Router } = require('express');
const Account = require('../services/Account');
var dateFormat = require('dateformat');

const router = new Router();

router.get('/', async function (req, res) {
    const account = await Account.findAccountStatusTypeId();
    res.render('admin', { account, dateFormat });
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
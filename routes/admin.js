const { Router } = require('express');
const Account = require('../services/Account');
var dateFormat = require('dateformat');

const router = new Router();

router.get('/', async function index(req, res) {
    const account = await Account.findAccountStatusTypeId();
    res.render('admin', {account, dateFormat});
});

module.exports = router;
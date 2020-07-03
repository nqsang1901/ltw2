const { Router } = require('express');
const Account = require('../services/Account');
var dateFormat = require('dateformat');

const router = new Router();

router.get('/', async function index(req, res) {
    console.log(req.currentUser.UserId);
    const account = await Acount.findAccountStatusTypeId(req.currentUser.UserId);
    res.render('admin', {account, dateFormat});
});

module.exports = router;
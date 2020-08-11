const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const Account = require('../services/Account');
const router = new Router();

router.get('/', function getAccount(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    const UserId = req.currentUser.UserId;
    const account = Account.findAccountByUserId(UserId);
    res.render('profile');
});


module.exports = router;
const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const crypto = require('crypto');
const GetTime = require("../services/GetTime");
const Email = require('../services/Email');

const router = new Router();

router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', async function (req, res, next) {
    const usercheck = await User.findUserByEmail(req.body.email);
    if (usercheck) { // Khong tim thay user
        const message = "Tài khoản đã tồn tại!";
        return res.render('register', { message });
    }

    const password = User.hashPassword(req.body.password);
    const token = crypto.randomBytes(3).toString('hex').toUpperCase();
    const gettime = GetTime.getTheCurrentTime();
    //  UserId, UserName, EmailAddress, PassWord, soCMND, Token
    const b = req.body.DateOfBirth.split('/');
    const user = await User.add(await User.numberOfUsers() + 1, req.body.username, req.body.email, password, req.body.IdentityCardNumber, new Date(b[2], b[1] - 1, b[0], 14, 39, 7), token);
    await Email.send(req.body.email, 'Mã kích hoạt tài khoản', `${process.env.BASE_URL}/login/${user.id}/${token}`);
    res.locals.user = user;
    req.session.userId = user.id;
    res.redirect('/');
});

module.exports = router;
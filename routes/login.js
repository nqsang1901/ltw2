const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const random = require('random');
const GetTime = require("../services/GetTime");

const router = new Router();

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', async function (req, res, next) {
    const user = await User.findUserByEmail(req.body.email);
    if (!user || !User.verifyPassword(req.body.password, user.PassWord)) { // Khong tim thay user
        const message = "Tài khoản không tồn tại! Vui lòng đăng nhập lại!"
        return res.render('login', { message });
    }
    if(user.UserTypeId == 2) {
        req.session.userId = user.UserId;
        return res.redirect('/admin/user');
    }
    req.session.userId = user.UserId;
    res.redirect('/');
});

router.get('/:id/:token', asyncHandler(async function (req, res) {
    const { id, token } = req.params;

    var user = await User.findUserById(id);
    if (user && user.Token === token) {
        user.Token = null;
        user.UserStatusId = 2;
        user.save();
    }
    
    req.session.userId = id;
    res.redirect('/');
}));

module.exports = router;
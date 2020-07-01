const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const Acount = require('../services/Acount');
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
    if(user.TypeUser == 2) {
        req.session.userId = user.UserId;
        return res.redirect('/admin');
    }
    req.session.userId = user.UserId;
    res.redirect('/');
});

router.get('/:id/:token', asyncHandler(async function (req, res) {
    const { id, token } = req.params;

    var user = await User.findUserById(id);
    if (user && user.Token === token) {
        user.Token = "";
        user.save();
    }

    const acountcheck = await Acount.findAcountByUserId(id);
    if(acountcheck) {
        req.session.userId = id;
        return res.redirect('/');
    }
    let AcountId;
    while(true) {
        AcountId = random.int(100000, 999999);
        const acountcheck = await Acount.findAcountByAcountId(AcountId);
        if(!acountcheck){
            break;
        }
    }
    const acount = await Acount.add(AcountId, 0, GetTime.getTheCurrentTime(), id, 1);
    req.session.userId = id;
    res.redirect('/');
}));

module.exports = router;
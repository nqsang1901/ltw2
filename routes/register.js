const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');
const crypto = require('crypto');
const GetTime = require("../services/GetTime");
const Email = require('../services/Email');
const upload = require('../middlewares/upload');

const router = new Router();

router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', upload.single('avatar'), asyncHandler(async function (req, res, next) {
    const getUser = req.body;
    const usercheck = await User.findUserByEmail(getUser.email);
    if (usercheck) { // Khong tim thay user
        const message = "Tài khoản đã tồn tại!";
        return res.render('register', { message });
    }
    let id = await User.numberOfUsers() + 1;
    const password = User.hashPassword(req.body.password);
    const token = crypto.randomBytes(3).toString('hex').toUpperCase();
    // const gettime = GetTime.getTheCurrentTime();
    //  UserId, UserName, EmailAddress, PassWord, soCMND, Token
    const birth = req.body.DateOfBirth.split('/');
    const user = await User.add(id, getUser.username, getUser.email, password, req.file.filename, getUser.IdentityNumber, new Date(birth[2], birth[1] - 1, birth[0], 14, 39, 7), token);
    // await Email.send(getUser.email, 'Mã kích hoạt tài khoản', `${process.env.BASE_URL}/login/${id}/${token}`);
    await Email.send(getUser.email, 'Mã kích hoạt tài khoản', `http://localhost:3000/login/${id}/${token}`);
    res.locals.user = user;
    req.session.userId = user.id;
    res.redirect('/');
}));

module.exports = router;
const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');

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
    req.session.userId = user.UserId;
    res.redirect('/home');
});

// router.get('/:id/:token', asyncHandler(async function (req, res) {
//     const { id, token } = req.params;
//     var user = await User.findByID(id);
//     if (user && user.token === token) {
//         user.save();
//     }
//     req.session.userId = user.id;
//     res.redirect('/articles');
// }));

module.exports = router;
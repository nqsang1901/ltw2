const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const NguoiDung = require('../services/NguoiDung');

const router = new Router();

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', async function (req, res, next) {
    const nguoidung = await NguoiDung.timNguoiDungBangEmail(req.body.email);
    if (!nguoidung || !NguoiDung.verifyPassword(req.body.password, nguoidung.MatKhau)) { // Khong tim thay user
        const message = "Không tìm thấy tài khoản! Vui lòng đăng nhập lại!";
        console.log(typeof(message));
        return res.render('login', { message });
    }
    req.session.manguoidung = nguoidung.MaNguoiDung;
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
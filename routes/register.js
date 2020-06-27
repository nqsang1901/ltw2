const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const NguoiDung = require('../services/NguoiDung');


const router = new Router();

router.get('/', function (req, res, next) {
    res.render('register');
});

router.post('/', async function (req, res, next) {
    var nguoidung = await NguoiDung.timNguoiDungBangEmail(req.body.email);
    if (nguoidung) {
        return res.render('register');
    }
    const password = NguoiDung.hashPassword(req.body.password);
    await Admin.add(req.body.email, req.body.name, password);

    admin = await Admin.findAdminByEmail(req.body.email);
    if (req.session.adminId) {
        delete req.session.adminId;
    }
    req.session.adminId = admin.id;
    res.redirect('/profile');
});

module.exports = router;
const NguoiDung = require('../services/NguoiDung');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async function auth(req, res, next) {
    res.locals.nguoidung = req.nguoidung;
    
    const manguoidung = req.session.manguoidung;
    res.locals.nguoidunghientai = null;
    if(!manguoidung) {
        return next();
    }
    const nguoidung = await NguoiDung.timNguoiDungBangId(manguoidung);
    if(!nguoidung) {
        return next();
    }
    req.nguoidunghientai = nguoidung;
    res.locals.nguoidunghientai = nguoidung;
    next();
});
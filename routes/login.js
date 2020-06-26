const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../services/user');

const router = new Router();

router.get('/', function (req, res, next) {
    res.render('login');
});

router.post('/', async function (req, res, next) {
    const user = await User.findAdminByEmail(req.body.email);
    if (!admin || !Admin.verifyPassword(req.body.password, admin.password)) { // Khong tim thay user
        return res.render('Login/login');
    }
    req.session.adminId = admin.id;
    res.redirect('/home');
});

router.get('/:id/:token', asyncHandler(async function (req, res) {
    const { id, token } = req.params;
    var user = await User.findByID(id);
    if (user && user.token === token) {
        user.save();
    }
    req.session.userId = user.id;
    res.redirect('/articles');
}));

module.exports = router;
const { Router } = require('express');
const upload = require('../middlewares/upload');
const asyncHandler = require('express-async-handler');
const User = require('../services/User');

const router = new Router();

router.get('/', async (function getProfile(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    }
    const account
    res.render('profile');
}));

router.post('/', upload.single('avatar'), asyncHandler(async function(req, res, next) {
    const UserId = req.currentUser.UserId;
    const user = await User.findUserById(UserId);
    if(user && user.UserId === req.currentUser.UserId) {
        await user.chanceAvatar(req.file.filename);
    }
    res.redirect('/profile');
}));

module.exports = router;
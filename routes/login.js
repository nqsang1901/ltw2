const { Router } = require('express');
const asyncHandler = require('express-async-handler');

const router = new Router();

router.get('/', function getLogin(req, res, next) {
    res.render('login');
});
module.exports = router;
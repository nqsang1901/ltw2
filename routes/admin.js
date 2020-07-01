const { Router } = require('express');
const Acount = require('../services/Acount');
var dateFormat = require('dateformat');

const router = new Router();

router.get('/', async function index(req, res) {
    console.log(req.currentUser.UserId);
    const acount = await Acount.findAcountStatusTypeId(req.currentUser.UserId);
    res.render('admin', {acount, dateFormat});
});

module.exports = router;
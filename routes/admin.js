const { Router } = require('express');
const Acount = require('../services/Acount');
var dateFormat = require('dateformat');

const router = new Router();

router.get('/', async function index(req, res) {
    const acount = await Acount.findAcountTypeId();
    console.log(acount);
    res.render('admin', {acount, dateFormat});
});

module.exports = router;
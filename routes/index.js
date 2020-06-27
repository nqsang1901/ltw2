const { Router } = require('express');
const {getmainFunCol1, getmainFunCol2} = require('../services/mainFun');

const router = new Router();

router.get('/', function index(req, res) {
    const mainfuncol1 = getmainFunCol1();
    const mainfuncol2 = getmainFunCol2();
    res.render('index', {mainfuncol1, mainfuncol2});
});

module.exports = router;
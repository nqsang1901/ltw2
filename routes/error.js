const { Router } = require('express');
const router = new Router();

router.get('*', function index(req, res) {
    res.render('error');
});

module.exports = router;
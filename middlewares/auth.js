// const User = require('../services/user');
// const asyncHandler = require('express-async-handler');

// module.exports = asyncHandler(async function auth(req, res, next) {
//     res.locals.user = req.user;
    
//     const userId = req.session.userId;
//     res.locals.currentUser = null;
//     if(!userId) {
//         return next();
//     }
//     const user = await User.findByID(userId);
//     if(!user) {
//         return next();
//     }
//     req.currentUser = user;
//     res.locals.currentUser = user;
//     next();
// });
const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req,res,next) => {
    const token = req.cookies.login;
    if(token == null){
        if(req.originalUrl === '/signup'){
            return next();
        }
        else{
            return res.redirect('/signup')
        }
    }
    jwt.verify(token,"secret",async (err,uname) => {
        res.locals.user = uname;
        if(req.originalUrl === '/signup'){
            return res.redirect('/homePage');
        }
        next();
    })
    
    return next();
}
const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req,res,next) => {
    const token = req.cookies.login;
    if(token == null){
        if(req.originalUrl === '/signup' || req.originalUrl === '/login' || req.originalUrl === '/forgotPassword'){
            return next();
        }
        else{
            return res.redirect('/login')
        }
    }
    
    jwt.verify(token,"secret",async (err,uname) => {
        if(err) {
            console.log(err);
            return res.redirect('/login')
        }
        res.locals.user = uname;
        if(req.originalUrl === '/signup' || req.originalUrl === '/login' || req.originalUrl === '/'){
            return res.redirect('/homePage');
        }
        next();
    });
    
    
}
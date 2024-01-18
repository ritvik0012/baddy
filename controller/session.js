const jwt = require('jsonwebtoken');

const User = require('../models/users');

exports.getSignUp = (req,res) => {
    res.render("signup",{alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.getHomePage = (req,res) => {
    res.render("homePage", {alert: req.flash('alert'), notice: req.flash('notice'), currentuser: res.locals.user})
}

exports.postSignUp = async (req,res) => {
  var uname = req.body.uname;
  var doesUserExist = await User.findOne({username: uname});
  if(doesUserExist){
    req.flash('alert',"Username already exists");
    console.log("Username already exists");
    res.redirect('/signup')
    return;
  }
  else {
    const user = new User({
      username: uname,
      password: req.body.psw,
    });

    user.save().then((value) => {
      console.log(value)
      console.log("Entry added in database");
    }).catch((err) => console.log(err));
    const token = jwt.sign(uname,"secret");
    res.cookie("login",token,{
        httpOnly: true,
        secure: true,
    })
    res.redirect("/homePage")
}
}

exports.postLogout = (req,res) => {
    res.clearCookie('login');
    req.flash("alert","successfully logged out");
    res.redirect("/signup");

}

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/users');

exports.getSignUp = (req,res) => {
    res.render("signup",{alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.getLogin = (req,res) => {
  res.render("login", {alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.getHomePage = (req,res) => {
    res.render("homePage", {alert: req.flash('alert'), notice: req.flash('notice'), currentuser: res.locals.user})
}

exports.getForgotPassword = (req,res) => {
  res.render("forgotPassword", {alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.postForgotPassword = async (req,res) => {
  var email = req.body.email;
  var doesEmailExist = await User.findOne({email: email});
  if(doesEmailExist){
    res.redirect('/forgotPassword');
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ritvik0012@gmail.com',
        pass: 'tdiq hvzd rfxa wpeb',
      }
    });
    var mailOptions = {
      from: 'ritvik0012@gmail.com',
      to: email,
      subject: 'OTP for changing password!',
      text: 'This is the otp ' + otp,
    }
    transporter.sendMail(mailOptions, function(error,info) {
      if(error){
        console.log(error);
      }
      else{
        console.log('Email sent: ' + info.response);
      }
    })
  }
  else{
    req.flash('alert','Email Does Not Exist!');
    res.redirect('/forgotPassword');
  }
}
exports.postLogin = async (req,res) => {
  var uname = req.body.uname;
  var password = req.body.psw;
  var user = {
    username: uname,
    password: password,
  }
  var doesUserExist = await User.findOne(user);
  console.log(user,doesUserExist);
  if(doesUserExist){
    const token = jwt.sign(uname,"secret");
    res.cookie("login",token,{
      httpOnly: true,
      secure: true,
  })
    res.redirect("/homePage");
  }
  else{
  res.redirect("/login");
  }
}

exports.postSignUp = async (req,res) => {
  console.log(req.params);
  var uname = req.body.uname;
  var email = req.body.email;
  var doesUserExist = await User.findOne({email: email});
  console.log(doesUserExist);
  if(doesUserExist){
    req.flash('alert',"Email already exists");
    console.log("Email already exists");
    res.redirect('/signup')
    return;
  }
  else {
    req.flash('alert','Successfull created user!');
    const user = new User({
      email: email,
      username: uname,
      password: req.body.psw,
    });

    user.save().then((value) => {
      console.log(value)
      console.log("Entry added in database");
    }).catch((err) => console.log(err));
    res.redirect("/login");
}
}

exports.postLogout = (req,res) => {
    res.clearCookie('login');
    req.flash("alert","successfully logged out");
    res.redirect("/signup");

}

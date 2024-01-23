const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/users');
const Token = require('../models/token');

exports.getSignUp = (req,res) => {
    res.render("signup",{alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.getLogin = (req,res) => {
  res.render("login", {alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.getHomePage = (req,res) => {
    res.render("homePage", {alert: req.flash('alert'), notice: req.flash('notice'), currentuser: res.locals.user})
}

exports.getReset = (req,res) => {
  console.log(req.params.userId);
  res.render("reset", {alert: req.flash('alert'), notice: req.flash('notice'), token: req.params.userId});
}

exports.getForgotPassword = (req,res) => {
  res.render("forgotPassword", {alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.postForgotPassword = async (req,res) => {
  var email = req.body.email;
  var doesEmailExist = await User.findOne({email: email});
  if(doesEmailExist){
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ritvik0012@gmail.com',
        pass: 'tdiq hvzd rfxa wpeb',
      }
    });
    const token = await new Token({
      email: email,
    }).save();
    
    const link = `http://localhost:3000/reset/${token._id}`;
    var mailOptions = {
      from: 'ritvik0012@gmail.com',
      to: email,
      subject: 'OTP for changing password!',
      text: link,
    }
    transporter.sendMail(mailOptions, function(error,info) {
      if(error){
        console.log(error);
      }
      else{
        console.log('Email sent: ' + info.response);
      }
    })

    //push the otp to model and add user_id to redirect and use userid to confirm otp.
    req.flash('alert','Email sent with password change link!')
    res.redirect('/forgotPassword');
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

exports.postReset = async (req,res) => {
  console.log(req.body.password);
  const token = await Token.findOne({_id: req.params.token});
  const filter = { email: token.email };
  const updateDoc = {
      $set: {
          password: req.body.password,
          },
      };
  const updateResult = await User.updateOne(filter,updateDoc);
  console.log(updateResult);

  const user = await User.findOne({email: token.email});
  Token.deleteOne({id: req.params.token});
  console.log(user);
  req.flash('alert','successfully changed password!');
  res.redirect('/signup');
}

exports.postLogout = (req,res) => {
    res.clearCookie('login');
    req.flash("alert","successfully logged out");
    res.redirect("/signup");

}

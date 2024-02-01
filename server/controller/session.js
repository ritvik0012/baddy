const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/users');
const Token = require('../models/token');

exports.getSignUp = (req,res) => {
    res.status(200).json({test:"TEST"});
    //res.render("signup",{alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.getLogin = (req,res) => {
  //res.status(200).json({test:"TEST1"});
  res.render("login", {alert: req.flash('alert'), notice: req.flash('notice')});
}

exports.getHomePage = (req,res) => {
    const token = req.cookies.login;
    console.log("this api is hit");
    jwt.verify('eyJhbGciOiJIUzI1NiJ9.cml0dmlrMDAxMkBnbWFpbC5jb20.0E6enRjlapGcBM3nkG3CHctqJeeshstsL9GgZNJSuPc',"secret",async (err,uname) => {
      if(err) {
          console.log(err);
          //return res.redirect('/login')
      }
      res.locals.user = uname;
      /*
      if(req.originalUrl === '/signup' || req.originalUrl === '/login' || req.originalUrl === '/'){
          return res.redirect('/homePage');
      }
      */
      
  
  })
    res.status(200).json({currentuser: res.locals.user});
    //res.render("homePage", {alert: req.flash('alert'), notice: req.flash('notice'), currentuser: res.locals.user})
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
    res.status(200).json({message:"success"});
  }
  else{
    res.status(200).json({message:"Email does not exist!"});
  }
}
exports.postLogin = async (req,res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = {
    email: email,
    password: password,
  }
  var doesUserExist = await User.findOne(user);
  console.log(user,doesUserExist);
  if(doesUserExist){
    const token = jwt.sign(email,"secret");
    res.cookie("login",token,{
      httpOnly: true,
      secure: true,
  })
    res.status(200).json({message:"success",user,token});
    //res.redirect("/homePage");
  }
  else{
  res.status(200).json({message:"user does not exist"});
  }
}

exports.postSignUp = async (req,res) => {
  console.log(req.params);
  var uname = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var doesUserExist = await User.findOne({email: email});
  console.log(doesUserExist);
  if(doesUserExist){
    req.flash('alert',"Email already exists");
    console.log("Email already exists");
    res.status(200).json({message:"email already exists"});
    return;
  }
  else {
    req.flash('alert','Successfull created user!');
    const user = new User({
      email: email,
      username: uname,
      password: password,
    });

    user.save().then((value) => {
      console.log(value)
      console.log("Entry added in database");
    }).catch((err) => console.log(err));
    res.status(200).json({message:'success'});
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
  res.status(200).json({message:"success"});
}

exports.postLogout = (req,res) => {
    res.clearCookie('login');
    //jwt.destroy();
    req.flash("alert","successfully logged out");
    res.redirect("/signup");

}

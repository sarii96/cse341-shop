const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

const { render } = require('pug');
const User = require('../models/user');


exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0){
    message = message[0];
  }else{
    message = null;
  }
        console.log(req.session.isLoggedIn);
        res.render('authe/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: message,
          isAuthenticated: false
           });
     
  };

  exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0){
      message = message[0];
    }else{
      message = null;
    }
    res.render('authe/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: message,
      isAuthenticated: false
       });
  }
  
  exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
   
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.render('authe/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        isAuthenticated: false
         });
    }

    User.findOne({email: email})
        .then(user => {
          if (!user){
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
          }
          bcrypt.compare(password, user.password)
          .then(doMatch =>{
            if (doMatch){
              req.session.isLoggedIn = true;
              req.session.user = user;
             return req.session.save(err => {
                console.log(err);
               res.redirect('/');
              });
            }
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
       
        })
        .catch(err => console.log(err));
      };

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render('authe/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      isAuthenticated: false
       });
  }
 
 bcrypt
  .hash(password, 12)
  .then(hashedPassword =>{
const user = new User({
    email: email,
    password: hashedPassword,
    cart: {items: []}
  });

  return user.save();
})

.then(result =>{
  res.redirect('/login');
})

  .catch(err => {
  console.log(err);
});
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
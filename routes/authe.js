const { promiseImpl } = require('ejs');
const express = require('express');
const {check, body} = require('express-validator/check')
const autheControllers = require('../controllers/authe');
const User = require('../models/user');
const router = express.Router();


router.get('/login', autheControllers.getLogin);
router.get('/signup', autheControllers.getSignup);
router.post('/login', 
[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('password', 'Password has to be valid.')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()

]
,autheControllers.postLogin);
router.post('/signup',
[
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      // if (value === 'test@test.com') {
      //   throw new Error('This email address if forbidden.');
      // }
      // return true;
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'This email exists already, please pick a different one.'
          );
        }
      });
    })
    .normalizeEmail(),
  body(
    'password',
    'Please enter a password with only numbers and text and at least 5 characters.'
  )
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim(),
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
]
 ,autheControllers.postSignup);

router.post('/logout', autheControllers.postLogout);


module.exports = router;

// ,check('email').isEmail()
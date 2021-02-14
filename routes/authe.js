const express = require('express');
const autheControllers = require('../controllers/authe');
const router = express.Router();


router.get('/login', autheControllers.getLogin);
router.get('/signup', autheControllers.getSignup);
router.post('/login', autheControllers.postLogin);
router.post('/signup', autheControllers.postSignup);
router.post('/logout', autheControllers.postLogout);


module.exports = router;
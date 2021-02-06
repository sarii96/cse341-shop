exports.getLogin = (req, res, next) => {

        res.render('authe/login', {
          path: '/login',
          pageTitle: 'Login',
          isAuthenticated: false
           });
     
  };

  exports.getSignup = (req, res, next) => {
    res.render('authe/login', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
       });
  }
  
  exports.postLogin = (req, res, next) => {
    
res.redirect('/')
 
};

exports.postSignup = (req, res, next) => {
}

exports.postLogout = (req, res, next) => {
}
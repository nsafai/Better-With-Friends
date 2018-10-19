var express = require('express');
var router = express.Router();
const User = require('../models/user');

// set layout variables
router.use(function(req, res, next) {
  res.locals.title = "Event Starter";
  res.locals.user = req.session.user;

  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/signup', (req, res, next) => {
  res.render('users/new');
});

// login
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      const next_error = new Error("Email or password incorrect");
      next_error.status = 401;

      return next(next_error);
    } else {
      req.session.user = user;
      console.log(user);
      console.log(req);
      // console.log("Login request from: " + originalUrl);

      // req.session.isAdmin = user.admin;
      return res.redirect('/');
    }
  });
});

// logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
  }
  return res.redirect('/login');
});


module.exports = router;

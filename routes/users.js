const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./helpers/auth');

//Users index
router.get('/', auth.requireLogin, (req, res, next) => {
  User.find({}, 'email', function(err, users) {
    if (err) {
      console.error(err);
    } else {
      res.render('users/index', {
        users: users
      });
    }
  });
});

// GET: Users NEW
router.get('/new', (req, res, next) => {
  res.render('users/new');
});

// POST: creates a new user
router.post('/', (req, res) => {
  const user = new User(req.body);

  user.save().then((user) => {
    console.log(req.headers.referer);
    req.session.user = user;
    res.redirect('/');
  }).catch((err) => {
    return res.status(400).send({
      err
    });
  });
});

module.exports = router;

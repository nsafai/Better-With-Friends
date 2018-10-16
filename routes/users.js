const express = require('express');
const router = express.Router();
const User = require('../models/user');

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
  // CREATE User and JWT
  const user = new UserSchema(req.body);

  user.save().then((user) => {
    res.redirect('back');
    // res.send("blah")
  }).catch((err) => {
    return res.status(400).send({
      err
    });
  });
});

module.exports = router;

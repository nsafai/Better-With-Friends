const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Users index
router.get('/', (req, res, next) => {
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

// Users new
router.get('/new', (req, res, next) => {
  res.render('users/new');
});

// Users create
// router.post('/', (req, res, next) => {
//   const user = new User(req.body);
//
//   user.save(function(err, user) {
//     if(err) console.log(err);
//     return res.redirect('/users');
//   });
// });

// POST: creates a new user
router.post('/', (req, res) => {
  // CREATE User and JWT
  const user = new UserSchema(req.body);

  user.save().then((user) => {
    // router.locals.user = user;
    res.redirect('back');
    // res.send("blah")
  }).catch((err) => {
    return res.status(400).send({
      err
    });
  });
});

module.exports = router;

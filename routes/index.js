var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Event Starter' });
});

router.get('/signup', (req, res, next) => {
  res.render('users/new');
});

module.exports = router;

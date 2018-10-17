const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const Event = require('../models/event');

// Events index
router.get('/', (req, res, next) => {
  Event.find({}, function(err, events) {
    if(err) {
      console.error(err);
    } else {
      res.render('events/index', { events: events });
    }
  });
});

// Events new
router.get('/new', (req, res, next) => {
  res.render('events/new');
});

// Events create
router.post('/', auth.requireLogin, (req, res, next) => {
  let event = new Event(req.body);

  event.save(function(err, event) {
    if(err) { console.error(err) };

    return res.redirect('/events');
  });
});

// Events show
router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id, function(err, event) {
    if(err) { console.error(err) };
    console.log(event.coverImageUrl);

    res.render('events/show', { event: event });
  });
});
// Events edit
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  Event.findById(req.params.id, function(err, event) {
    if(err) { console.error(err) };

    res.render('events/edit', { event: event });
  });
});

// Events update
router.post('/:id', auth.requireLogin, (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, req.body, function(err, event) {
    if(err) { console.error(err) };
    console.log(req.body);
    res.redirect('/events/' + req.params.id);
  });
});

module.exports = router;

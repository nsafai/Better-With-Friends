const express = require('express');
const router = express.Router();

const auth = require('./helpers/auth');
const User = require('../models/user');
const Event = require('../models/event');

// Events index
router.get('/', (req, res, next) => {
  Event.find({
    'listPublicly': {
      $ne: null
    }
  }, function(err, events) {
    if (err) {
      console.error(err);
    } else {
      res.render('events/index', {
        events: events
      });
    }
  }).sort([
    ['eventDate', 1]
  ]);
});

// Events new
router.get('/new', (req, res, next) => {
  res.render('events/new');
});

// Events create
router.post('/', auth.requireLogin, (req, res, next) => {
  let event = new Event(req.body);

  event.save(function(err, event) {
    if (err) {
      console.error(err)
    };

    return res.redirect('/events');
  });
});

// Events show
router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.error(err)
    };
    // console.log(event);
    if (event.numberOfAttendees > 0) {
      User.find({
        '_id': { $in: event.arrayOfAttendeeIds}
      }, function(err, attendees) {
        console.log(event.arrayOfAttendeeIds);
        console.log("attendees:" + attendees);
        res.render('events/show', {
          event: event,
          attendees: attendees
        });
      });
    } else {
      res.render('events/show', {
        event: event
      });
    }
  });
});
// Events edit
router.get('/:id/edit', auth.requireLogin, (req, res, next) => {
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.error(err)
    };
    res.render('events/edit', {
      event: event
    });
  });
});

// Events update
router.post('/:id', auth.requireLogin, (req, res, next) => {
  // console.log(req.params.id);

  Event.findByIdAndUpdate(
    req.params.id, {
      $addToSet: {
        arrayOfAttendeeIds: req.body.attendeeUserId
      },
      $set: {
        numberOfAttendees: req.body.numberOfAttendees
      }
    },
    function(err, event) {
      // console.log(req);
      // console.log(req);
      if (err) {
        console.error(err)
      };
      // console.log(req.body);
      res.redirect('/events/' + req.params.id);
    });
});

module.exports = router;

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
  // console.log(req);
  console.log("TEST 1");
  let event = new Event(req.body);
  console.log("TEST 2");
  event.save(function(err, event) {
    if (err) {
      console.error(err)
    };
    console.log("TEST 3");
    // console.log("inside events CREATE method");
    return res.redirect('/events');
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
  // console.log(req.body);
  // console.log(req.params.id);
  let updatedEvent = new Event(req.body);

  Event.findByIdAndUpdate(
    req.params.id, {
      $set: {
        eventName: updatedEvent.eventName,
        costPerTicket: updatedEvent.costPerTicket,
        minimumAttendees: updatedEvent.minimumAttendees,
        maximumAttendees: updatedEvent.maximumAttendees,
        eventLocation: updatedEvent.eventLocation,
        eventDate: updatedEvent.eventDate,
        coverImageUrl: updatedEvent.coverImageUrl,
        eventDescription: updatedEvent.eventDescription,
        listPublicly: updatedEvent.listPublicly
      }
    },
    function(err, event) {
      if (err) {
        console.error(err)
      };
      res.redirect('/events/' + req.params.id);
    });

  console.log("updated event details: " + updatedEvent);
  // console.log("event that was found: " + event);

});

// Events show
router.get('/:id', (req, res, next) => {

  Event.findById(req.params.id, function(err, event) {
    if (err) {
      console.error(err)
    };
    // console.log(event);
    if (event.arrayOfAttendeeIds.length > 0) {
      User.find({
        '_id': {
          $in: event.arrayOfAttendeeIds
        }
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


// Events Join
router.post('/:id/join', auth.requireLogin, (req, res, next) => {
  console.log(req);
  Event.findByIdAndUpdate(
    req.params.id, {
      $addToSet: {
        arrayOfAttendeeIds: req.body.attendeeUserId
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

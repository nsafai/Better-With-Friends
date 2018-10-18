const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const EventSchema = new Schema({
  eventName: { type: String, required: true, unique: true },
  eventDate: { type: String },
  eventLocation: { type: String, required: true },
  costPerTicket: { type: Number, required: true },
  minimumAttendees: { type: Number, required: true },
  maximumAttendees: { type: Number },
  coverImageUrl: { type: String },
  eventDescription: { type: String },
  listPublicly: { type: String },
  organizerName: { type: String },
  organizerUserId: { type: String, required: true }
});

EventSchema.plugin(uniqueValidator);

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;

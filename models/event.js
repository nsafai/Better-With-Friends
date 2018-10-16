const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const EventSchema = new Schema({
  eventName: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

EventSchema.plugin(uniqueValidator);

// UserSchema.pre('save', function(next) {
//   let user = this;
//
//   bcrypt.hash(user.password, 10, function (err, hash){
//     if (err) return next(err);
//
//     user.password = hash;
//     next();
//   })
// });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;

// hide some sensitive data
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const SESSION_CODE = process.env.SESSION_CODE;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');

var app = express();

// configure sessions
const session = require('express-session');
app.use(session({ secret: '${SESSION_CODE}', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true }));

// var helpers = require('handlebars-helpers');
// view engine setup
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("handlebars-helpers").helpers
}));
app.set('view engine', 'hbs');
// var helpers = require('handlebars-helpers')();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Database setup
const mongoose = require('mongoose');
const mongoURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${MONGODB_URI}`
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true); // silencing a deprecated feature warning that's a bug per https://github.com/Automattic/mongoose/issues/6890
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Database setup

// mongoose.connect(process.env.MONGODB_URI || mongoURI);

// for heroku
const port = process.env.PORT || 3000;

module.exports = app;

//Import Middleware
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const passport = require('passport');
const config = require('./config');

//Import Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const aboutRouter = require('./routes/aboutRouter');
const adoptRouter = require('./routes/adoptRouter');
// const contactRouter = require('./routes/contactRouter');
const favoritesRouter = require('./routes/favoritesRouter');
const matchRouter = require('./routes/matchRouter');
// const volunteerRouter = require('./routes/volunteerRouter');

const mongoose = require('mongoose');

//use this port and database for url path
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'),
  err => console.log(err)
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Use Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/about', aboutRouter);
app.use('/adopt', adoptRouter);
// app.use('/contact', contactRouter);
// app.use('/volunteer', volunteerRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/favorites', favoritesRouter);
app.use('/match', matchRouter);


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

module.exports = app;

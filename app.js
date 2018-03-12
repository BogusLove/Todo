const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');
const tasks = require('./routes/task');
const users = require('./routes/users');
const groups = require('./routes/group');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/todo';
mongoose.connect(mongoDB, require('./db_config'));
mongoose.Promise = global.Promise;

const app = express();
require('./passport/local');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'grouptodomanagersecretkey',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 600000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (req, res, next) {
//   res.locals.login = req.isAuthenticated();
//   res.locals.session = req.session;
//   next();
// });

app.use('/tasks', tasks);
app.use('/users', users);
app.use('/groups', groups);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    err: err.message
  });
});

module.exports = app;

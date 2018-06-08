const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      passport = require('passport'),
      flash = require('connect-flash'),
      tasks = require('./routes/task'),
      users = require('./routes/user'),
      groups = require('./routes/group'),
      mongoose = require('mongoose'),
      mongoDB = 'mongodb://localhost:27017/todo',
      cors = require('cors');

require('./passport/strategy');
mongoose
    .connect(mongoDB, require('./db_config'))
    .Promise = global.Promise;

module.exports = express()
    .use(logger('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(cors())
    .use(session({
      secret: 'grouptodomanagersecretkey',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      cookie: { maxAge: 600000 }
    }))
    .use(flash())
    .use(passport.initialize())
    .use(passport.session())
    .use('/tasks', tasks)
    .use('/users', users)
    .use('/groups', groups)
    .use(function(req, res, next) {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    })
    .use(function(err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.json({
        err: err.message
      });
    })
//app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (req, res, next) {
//   res.locals.login = req.isAuthenticated();
//   res.locals.session = req.session;
//   next();
// });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
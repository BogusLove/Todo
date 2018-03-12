const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const UserController = require('../controllers/user');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User
        .findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        })
});

passport.use('local.signin', new LocalStrategy({
    usernameField: 'login', 
    passwordField: 'password', 
    passReqToCallback: true
}, function(req, login, password, done) {
    User.findOne({login: login}, (err, user) => {                
        if (err) {                      
            return done(err);
        };
        if (!user) {            
            return done(null, false, {message: 'User does not exist'});
        };
        if (user.password !== password) {
            console.log(user.password, password);
            return done(null, false, {message: 'Wrong password'});
        };
        return done(null, user);        
    });
}));

passport.use('local.signup', new LocalStrategy({ 
    usernameField: 'login', 
    passwordField: 'password', 
    passReqToCallback: true
}, (req, login, password, done) => {
    User.findOne({login: login}, async (err, user) => {               
        if (err) {
            return done(err); 
        };
        if (user) {
            return done(null, false, { message: 'This login is already in use' });
        }
        const newUser = {
            login: req.body.login,
            password: req.body.password,
            name: {
                first: req.body.first,
                second: req.body.second
            },
            admin: req.body.admin ? true : false
        };
        let response = await UserController.insert(newUser);
        if (response.err) {
            return done(response.err);
        } 
        else {
            return done(null, response.user);
        };        
    });
    }
));
const express = require('express');
const Router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/user');

Router
  .get('/', (req, res) => {
    res.json('Main user page');
  })
  .get('/signin', (req, res) => {
    res.json('SignIn now');
  })
  .get('/signup', (req, res) => {
    res.json('SignUp now');
  })  
  // .get('/facebook', passport.authenticate('facebook', {scope: ['email']}))
  // .get('/facebook/callback', passport.authenticate('facebook', {
  //   successRedirect: '/users/profile', 
  //   failureRedirect: '/users/signin'})
  // )
  .get('/profile', async (req, res) => {    
    let response = await UserController.getOneByID(req.session.passport.user);
    res.json(response);
  })
  .get('/logout', isAuth, (req, res) => {
    req.logOut();
    res.redirect('/users');
  })
  .post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/users/signin',
    failureFlash: true
  }), (req, res) => {
    if(req.session.oldUrl) {
      const oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } 
    else {
        res.redirect('/users');
    }
  })
  .post('/signup', passport.authenticate('local.signup', {
      failureRedirect: 'http://localhost:3000/signup',
      failureFlash: true
    }), (req, res) => {
      console.log(res);
      res.redirect('http://localhost:3000/');      
      // if(req.session.oldUrl) {
      //   const oldUrl = req.session.oldUrl;
      //   req.session.oldUrl = null;
      //   res.redirect(oldUrl);
      // } 
      // else {
      //     res.redirect('http://localhost:3000/');
      // }
    }
  )
  .put('/:id', async (req, res) => {
    const newUser = {
      login: req.body.login,
      password: req.body.password,
      name: {
        first: req.body.first,
        second: req.body.second
      },
      admin: req.body.admin ? true : false
    };
    let response = await UserController.update(req.params.id, newUser);
    res.json(response);
  })
  .delete('/:id', async (req, res) => {
    let response = await UserController.remove(req.params.id);
    res.json(response);
  });

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect('/users/signin');
}

module.exports = Router;

const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/user');

Router
  .get('/', async (req, res) => {
    let response = await UserController.getAll();
    res.json(response);
  })
  .get('/signin/:id', async (req, res) => {
    let response = await UserController.getOne(req.params.id);
    ///////////////session auth///////////////////////////////
    res.json(response);
  })
  .post('/', async (req, res) => {
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
    res.json(response);
  })
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
  })
  .get('/logout', (req, res) => {
    /////////////////session logout////////////////////////////
  })

module.exports = Router;

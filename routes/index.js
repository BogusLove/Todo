const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const TaskController = require('../controllers/task');
const moment = require('moment');
/* GET home page. */
router.get('/', async function(req, res, next) {
  let response = '';
  // const user = {
  //   login: '1111111',
  //   name: {first: 'Bogus', second: 'Love'},
  //   password: '1234'
  // };
  // response = await UserController.insert(user);
  // console.log(response);
  
  // const users = await UserController.getAll();
  // console.log(users);

  // response = await UserController.update("5a9d6157ab6a5c184b0e03fc", {
  //   login: '3432rew22',
  //   password: '1234',
  //   admin: false
  // });

  console.log(moment('2018-04-13 12:34').format('DD.MM.YYYY HH:mm'));
  
  let task = {
    date: new Date(moment('2018-04-13 12:34').format('DD.MM.YYYY HH:mm'))
  };
  //response = TaskController.remove('');
  //response = await TaskController.insert(task);
  response = await TaskController.update('5a9e4a760afdaf1a4d597503', task);  
  response = await TaskController.getAll();
  res.send(response);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const TaskController = require('../controllers/task');
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
  
  const users = await UserController.getAll();
  console.log(users);

  // response = await UserController.update("5a9d6157ab6a5c184b0e03fc", {
  //   login: '3432rew22',
  //   password: '1234',
  //   admin: false
  // });
  // console.log(response);
  // let task = {
  //   task: 'намалювати зайчика',
  //   date: new Date('02.04.2018').toLocaleString(),
  //   responsible: ['5a9d8ed121fe7442cc18b171'],
  //   status: 'todo'
  // };
  response = await TaskController.update('5a9d8f03fdf45d4318e08ec1', {responsible: '5a9d9b77eefd65496ef4a518'});
  response = await TaskController.getOne('5a9d8f03fdf45d4318e08ec1');
  res.send(response);
});

module.exports = router;
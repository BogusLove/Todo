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
  
  // const users = await UserController.getAll();
  // console.log(users);

  // response = await UserController.update("5a9d6157ab6a5c184b0e03fc", {
  //   login: '3432rew22',
  //   password: '1234',
  //   admin: false
  // });
   
  let task = {
    task: 'go to church',
    date: new Date(2018, 3, 11),
    responsible: ['5a9d8ed121fe7442cc18b171', '5a9d9b77eefd65496ef4a518'],
    status: 'todo'
  };
  //response = TaskController.remove('');
  //response = await TaskController.insert(task);
  //response = await TaskController.update('5a9e8a932e0b3b0dc9b1f94a', task);  
  //response = await TaskController.getOne('5a9e8a932e0b3b0dc9b1f94a');  
  res.send(response);
});

module.exports = router;
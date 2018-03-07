const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const TaskController = require('../controllers/task');
const GroupController = require('../controllers/group');
/* GET home page. */
router.get('/', async function(req, res, next) {
  let response = '';
  const user = {
    login: 'MariaLuga',
    name: {first: 'Marichka', second: 'Luga'},
    password: '1234',
    admin: false
  };
  //response = await UserController.insert(user);  
  // response = await UserController.getAll();
  // response = await UserController.update("5aa026ee454b4b14a0850ba9", {
  //   admin: false
  // });
   
  let task = {
    task: 'Намалювати зайчика',
    description: 'Має бути дуже гарно',
    deadlineDate: new Date(2018, 3, 11),
    responsible: ['5aa026ee454b4b14a0850ba9', '5aa02918ef9db516ee7f9ca7'],
    status: 'todo',
    anonyumous: false,
    groupID: '5aa0516eb777ae31437e2a31'
  };
  
  //response = await TaskController.insert(task);
  //response = await TaskController.update('5aa02b58db3b731a5d3e544c', task);  
  //response = TaskController.remove('5aa049996a600828c3c1282a');
  //response = await TaskController.getOne('5aa0560381e7f033982864fe');  
  //response = await TaskController.getAll();
  //response = await TaskController.removeAll();


  let group = {
    name: 'Покоління Любомира',
    members: ['5aa026c566ada61478812fe8', '5aa02918ef9db516ee7f9ca7'],
    admins: ['5aa026ee454b4b14a0850ba9']
  };

  //response = await GroupController.insert(group);  
  //response = await GroupController.update('5aa0516eb777ae31437e2a31', group);
  //response = await GroupController.remove('5aa0482073d76626cf048312');
  //response = await GroupController.getOne('5aa0516eb777ae31437e2a31');
  //response = await GroupController.getAll();
  //response = await GroupController.removeAll();
  res.send(response);
});

module.exports = router;
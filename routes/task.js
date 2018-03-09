const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/user');
const TaskController = require('../controllers/task');
const GroupController = require('../controllers/group');

Router
  .get('/', async (req, res) => {
    let response = await TaskController.getAll();
    res.json(response);
  })
  .get('/:id', async (req, res) => {
    let response = await TaskController.getOne(req.params.id);
    res.json(response);
  })
  .get('/group_tasks/:id', async (req, res) => {
    let response = await TaskController.getAllTasksForGroup(req.params.id);
    res.json(response);
  })
  .get('/user_tasks/:id', async (req, res) => {
    let response = await TaskController.getAllTasksForUser(req.params.id);
    res.json(response);
  })
  .post('/', async (req, res) => {
    const newTask = {
      task: req.body.task,
      description: req.body.description,
      deadlineDate: req.body.deadlineDate,
      responsible: req.body.responsible,
      groupID: req.body.groupID,
      status: req.body.status,
      anonyumous: req.body.anonyumous
    };
    let response = await TaskController.insert(newTask);
    res.json(response);
  })
  .put('/:id', async (req, res) => {
    const newTask = {
      task: req.body.task,
      description: req.body.description,
      deadlineDate: req.body.deadlineDate,
      responsible: req.body.responsible,
      groupID: req.body.groupID,
      status: req.body.status,
      anonyumous: req.body.anonyumous
    };
    let response = await TaskController.update(req.params.id, newTask);
    res.json(response);
  })
  .delete('/:id', async (req, res) => {
    let response = await TaskController.remove(req.params.id);
    res.json(response);
  });


module.exports = Router;

// let response = '';
// const user = {
//   login: 'MariaLuga',
//   name: {first: 'Marichka', second: 'Luga'},
//   password: '1234',
//   admin: false
// };
// //response = await UserController.insert(user);  
// // response = await UserController.getAll();
// // response = await UserController.update("5aa026ee454b4b14a0850ba9", {
// //   admin: false
// // });
 
// let task = {
//   task: 'Запросити музикантів',
//   description: 'Їм має бути зручно',
//   deadlineDate: new Date(2018, 6, 17),
//   responsible: ['5aa026ee454b4b14a0850ba9'],
//   status: 'todo',
//   anonyumous: false,
//   groupID: '5aa0516eb777ae31437e2a31'
// };

// //response = await TaskController.insert(task);
// //response = await TaskController.update('5aa02b58db3b731a5d3e544c', task);  
// //response = TaskController.remove('5aa049996a600828c3c1282a');
// //response = await TaskController.getOne('5aa0560381e7f033982864fe');  
// //response = await TaskController.getAll();
// //response = await TaskController.removeAll();


// let group = {
//   name: 'Покоління Любомира',
//   members: ['5aa026c566ada61478812fe8', '5aa02918ef9db516ee7f9ca7'],
//   admins: ['5aa026ee454b4b14a0850ba9']
// };

// //response = await GroupController.insert(group);  
// //response = await GroupController.update('5aa0516eb777ae31437e2a31', group);
// //response = await GroupController.remove('5aa0482073d76626cf048312');
// //response = await GroupController.getOne('5aa0516eb777ae31437e2a31');
// //response = await GroupController.getAll();
// //response = await GroupController.removeAll();

// response = await GroupController.getAllGroupsForUser('5aa026ee454b4b14a0850ba9');

// res.json(response);
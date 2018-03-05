const express = require('express');
const router = express.Router();
const controller = require('../controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  const newUser = {
    login: 'BogusLove',
    password: '1234',
    admin: true
  }; 
  //controller.UserContr.insert(newUser);
  console.log(111111, controller.UserContr.getAll());  
  res.render('index', { title: 'ToDo Manager' });
});

module.exports = router;
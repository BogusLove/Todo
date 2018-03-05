const express = require('express');
const router = express.Router();
const controller = require('../controller');

/* GET home page. */
router.get('/', async function(req, res, next) {  
  let response = '';
  const user = {
    login: 'dsaa',
    password: '1234'
  };
  // let response = await controller.UserContr.insert(user);
  // console.log(response);
  
  // const users = await controller.UserContr.getAll();
  // console.log(users);

  // response = await controller.UserContr.update("5a9d6157ab6a5c184b0e03fc", {
  //   login: '3432rew22',
  //   password: '1234',
  //   admin: false
  // });
  // console.log(response);
  
  res.send(response);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  controller.UserContr.insert({
    login: 'BogusLove',
    password: '1234',
    admin: true
  });
  console.log(111111, controller.UserContr.getAll());
  res.render('index', { title: 'ToDo Manager' });
});

module.exports = router;

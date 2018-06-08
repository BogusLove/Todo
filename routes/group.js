const express = require('express'),
      Router = express.Router(),
      GroupController = require('../controllers/group');

module.exports = Router
    .get('/', async (req, res) => {
        let response = await GroupController.getAll();
        res.json(response);
    })
    .get('/:id', async (req, res) => {
        let response = await GroupController.getOne(req.params.id);
        res.json(response);
    })
    .get('/user_groups/:id', async (req, res) => {
        let response = await GroupController.getAllGroupsForUser(req.params.id);
        res.json(response);
    })
    .post('/', async (req, res) => {
        const newGroup = {
            name: req.body.name,
            members: req.body.members,
            admins: req.body.admins
        };
        let response = await GroupController.insert(newGroup);
        res.json(response);
    })
    .put('/:id', async (req, res) => {
        const newGroup = {
            name: req.body.name,
            members: req.body.members,
            admins: req.body.admins
        };
        let response = await GroupController.update(req.params.id, newGroup);
        res.json(response);
    })
    .delete('/:id', async (req, res) => {
        let response = await GroupController.remove(req.params.id);
        res.json(response);
    });
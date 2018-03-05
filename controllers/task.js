const mongoose = require('mongoose');
const Task = require('../models/task');
const UserController = require('../controllers/user');

const TaskController = {
    getOne: async (taskID) => {
        try {                
            const task = await Task
                .findById(taskID)
                .populate('responsible')
                .then(result => {return result})
                .catch(err => {return err});            
            return task;
        } catch (err) {
            return err.message;
        }
    },

    getAll: async () => {
        try {
            let tasks = await Task.find();
            return tasks;
        } catch (err){
            return err.message;
        }
    },

    insert: async (task) => {             
        const newTask = new Task({
            task: task.task,
            description: task.description,
            date: task.date,
            responsible: task.responsible,
            status: task.status
        });
        return newTask
                .save()
                .then(result => { return result })
                .catch(err => { return err.message })
            
    },

    update: (taskID, newTask) => {
        const options = {
            new: true,
            upsert: false
        };
        return Task
            .findByIdAndUpdate({'_id': taskID}, newTask, options)
            .then(result => { return result })
            .catch(err => { return err.message });
    },

    remove: (taskID) => {
        return User
                .findByIdAndRemove(taskID)
                .exec()
                .then(result => { return result })
                .catch(err => { return err.message });
    }
};

module.exports = TaskController;

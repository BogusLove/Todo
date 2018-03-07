const mongoose = require('mongoose');
const Task = require('../models/task');
const UserController = require('../controllers/user');

const TaskController = {
    getOne: async (taskID) => {
        try {                
            const task = await Task
                .findById(taskID)
                // .populate({
                //     path: 'groupID',
                //     populate: {
                //         path: 'members admins', 
                //         select: 'name login'
                //     }
                // })
                .populate({
                    path: 'responsible',
                    select: 'name login'
                })
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
            deadlineDate: task.deadlineDate,
            responsible: task.responsible,
            groupID: task.groupID,
            status: task.status,
            anonyumous: task.anonyumous
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
        return Task
                .findByIdAndRemove(taskID)
                .exec()
                .then(result => { return result })
                .catch(err => { return err.message });
    },

    removeAll: () => {
        return Task
                .remove({})
                .exec()
                .then(result => { return result })
                .catch(err => { return err.message });
    }
};

module.exports = TaskController;

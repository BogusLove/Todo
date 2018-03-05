const mongoose = require('mongoose');
const User = require('../models/user');

const UserController = {
    getOne: async (userId) => {
        try {                
            const user = await User.findById(userId);
            return user;
        } catch (err) {
            return 'error while reading user with id = ' + userId;
        }
    },

    getAll: async () => {
        try {
            let users = await User.find();
            return users;
        } catch (err){
            return 'error while reading all users';
        }
    },

    insert: async (user) => {             
        const newUser = new User({
            login: user.login,
            password: user.password,
            name: user.name,
            admin: user.admin ? true : false
        });
        return newUser
                .save()
                .then(result => { return result })
                .catch(err => { return err.message })            
    },

    update: (userID, newUser) => {
        const options = {
            new: true,
            upsert: false
        };
        return User
            .findByIdAndUpdate({'_id': userID}, newUser, options)
            .then(result => { return result })
            .catch(err => { return err.message });
    },

    remove: (userId) => {
        return User
                .findByIdAndRemove(userId)
                .exec()
                .then(result => { return result })
                .catch(err => { return err.message });
    }
};

module.exports = UserController;

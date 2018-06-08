const mongoose = require('mongoose'),
      User = require('../models/user');

module.exports = {
    getOneByID: async (userId) => {
        try {                
            const user = await User.findById(userId);
            return { user: user };
        } catch (err) {
            return { err: err };
        }
    },

    getAll: async () => {
        try {
            let users = await User.find();
            return { users: users };
        } catch (err){
            return { err: err };
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
                .then(user => { return { user: user } })
                .catch(err => { return { err: err } })
    },

    update: (userID, newUser) => {
        const options = {
            new: true,
            upsert: false
        };
        return User
            .findByIdAndUpdate({'_id': userID}, newUser, options)
            .then(user => { return { user: user } })
            .catch(err => { return { err: err } });
    },

    remove: (userId) => {
        return User
                .findByIdAndRemove(userId)
                .exec()
                .then(result => { return { result: result } })
                .catch(err => { return { err: err } });
    },

    removeAll: () => {
        return User
                .remove({})
                .exec()
                .then(result => { return { result: result } })
                .catch(err => { return { err: err } });
    }   
};
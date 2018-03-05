const mongoose = require('mongoose');
const User = require('./models/user');

const controller = {
    UserContr: {
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
                admin: user.admin ? true : false
            });
            return newUser
                    .save()
                    .then(result => { return result })
                    .catch(err => { return err.message })
               
        },
    
        update: (userID, user) => {
            return User
                .find({'_id': userID})                
                .then((err, user) => {
                    user = {
                        login: user.login,
                        password: user.password,
                        admin: user.admin ? true : false
                    }
                    user.save((err, result) => {
                        if (err) return err;
                        return result;
                    });
                })   
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
    }
};

module.exports = controller;

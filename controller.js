const mongoose = require('mongoose');
const User = require('./models/user');

const controller = {
    UserContr: {
        getOne: async (userId) => {
            try {                
                const user = await User.findById(userId).exec();
                return user;
            } catch (err) {
                return 'error while reading user `userId`';
            }
        },
    
        getAll: async () => {
            try {
                const users = await User.find().exec();
                return users;
                // return User.find().then((err, result) => {
                //     if (err) errorHandle(err);
                //     return result;
                // })
            } catch (err){
                return 'error while reading';
            }
        },
    
        insert: (user) => { 
            const newUser = new User({
                login: user.login,
                password: user.password,
                admin: user.admin ? true : false
            });
            newUser.save((err, result) => {
                if (err) throw new Error(err);
                console.log(result);
            });
        },
    
        update: (user) => {
            const is = User.find({
                login: user.login,
                password: user.password,
                admin: user.admin
            }, 
            (err, result) => {
                if (err) errorHandle(err);
                if (result) return true;
                else return false; 
            });
            if (!is) {
                const upUser = new User({
                    login: user.login,
                    password: user.password,
                    admin: user.admin ? true : false
                });
                upUser.save((err, result) => {
                    if (err) errorHandle(err);
                });
            };        
        },
    
        remove: (userId) => {
            User.findByIdAndRemove(userId).exec();
        }
    },
    firstInsert: () => {
        const newUser = new User({
            login: 'Богуслав Барна',
            password: '1234',
            admin: true
        });
        newUser.save((err, result) => {
            if (err) errorHandle(err);
            else console.log('save', result);
        });
    },
    errorHandle: function (err) {    
        console.log(err);
        throw new Error(err);
    }
};

module.exports = controller;

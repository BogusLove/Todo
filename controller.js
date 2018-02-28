import mongoose from 'mongoose';
import User from './models/user';

mongoose.connect('localhost:27017/todo');

const controller = {
    UserContr: {
        getOne: async (userId) => {
            const user = await User.findById(userId, (err, result) => {//????????????????????????
                if (err) errorHandle(err);//????????????????????????
                else return result;//????????????????????????
            });
            return user;
        },
    
        getAll: async () => {
            let users = await User.find((err, result) => {//????????????????????????
                if (err) errorHandle(err);//????????????????????????
                else return result;//????????????????????????
            });
            return users;
        },
    
        insert: (user) => {
            const newUser = new User({
                login: user.login,
                password: user.password,
                admin: user.admin ? true : false
            });
            newUser.save((err, result) => {
                if (err) errorHandle(err);
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
    }
};

function errorHandle(err) {    
    console.log(err);
    throw new Error(err);
};

export default controller;
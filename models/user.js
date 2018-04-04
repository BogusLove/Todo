const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true,
        minlength: 4
    },
    name: {
        first: {type: String, required: true},
        second: {type: String, required: true}        
    },
    admin: {
        type: Boolean, 
        required: false
    // },
    // facebook: {
    //     id: {
    //         type: String,
    //         required: true
    //     },
    //     token: {
    //         type: String,
    //         required: true
    //     },
    //     email: {
    //         type: String,
    //         required: false
    //     },
    //     name: {
    //         first: {
    //             type: String,
    //             required: true
    //         },
    //         second: {
    //             type: String,
    //             required: true
    //         }
    //     }
    }
});

module.exports = mongoose.model('User', schema);
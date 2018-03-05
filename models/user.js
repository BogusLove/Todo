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
        required: true
    },
    admin: {
        type: Boolean, 
        required: false
    } 
});

module.exports = mongoose.model('User', schema);
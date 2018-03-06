const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    task: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    createDate: {
        type: Date,
        required: true
    },
    responsible: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],
        required: false
    },
    status: {
        type: String,
        enum: ['todo','pending', 'done'],
        required: true
    }    
});

module.exports = mongoose.model('Task', schema);
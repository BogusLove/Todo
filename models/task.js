const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const schema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    responsible: {
        type: [{type: ObjectId, ref: 'User'}],
        required: false
    }
});

module.exports = mongoose.model('Task', schema);
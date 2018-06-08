const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

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
    deadlineDate: {
        type: Date,
        required: false
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    responsible: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],
        required: false
    },
    groupID: {
        type: Schema.Types.ObjectId, 
        ref: 'Group',
        required: false
    },
    status: {
        type: String,
        enum: ['todo','pending', 'done'],
        required: true,
        default: 'todo'
    },
    anonyumous: {
        type: Boolean,
        required: true,
        default: false
    }    
});

module.exports = mongoose.model('Task', schema);
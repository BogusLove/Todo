const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    members: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],
        required: false
    },
    admins: {
        type: [{type: Schema.Types.ObjectId, ref: 'User'}],
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Group', schema);
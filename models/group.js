const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    admin: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Group', schema);
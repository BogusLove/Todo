import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, required: false} 
});

export default mongoose.model('User', schema);
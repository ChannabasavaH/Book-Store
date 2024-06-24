import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

const User = mongoose.model('User',UserSchema);

export default User;
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    'email': {
        type: String,
        required: true,
        unique: true
    },
    'first_name': {
        type: String,
        required: true
    },
    'last_name': {
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true,
        unique: true
    }
})



const User = mongoose.model('User', userSchema)

export default User
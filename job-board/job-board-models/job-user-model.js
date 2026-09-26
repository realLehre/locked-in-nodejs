import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minLength: 3,
        maxLength: 10
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please provide a valid email'],
        unique: true
    },
    password: String
})

const User = mongoose.model('User', UserSchema)

export default User

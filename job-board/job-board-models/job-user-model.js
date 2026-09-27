import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

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

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.genJWT = function () {
    return jwt.sign({name: this.name, userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
}

UserSchema.methods.genAccessToken = function () {
    return jwt.sign({name: this.name, userId: this._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_EXPIRES})
}

UserSchema.methods.checkPassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}

const User = mongoose.model('User', UserSchema)

export default User

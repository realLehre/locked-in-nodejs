import mongoose from 'mongoose'

const OtpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    otpHash: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: [
            'EMAIL_VERIFICATION',
            'PASSWORD_RESET',
            'LOGIN',
            'CHANGE_EMAIL',
            'CHANGE_PASSWORD',
            'SENSITIVE_ACTION'
        ],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: {
            expires: 0
        }
    },
    attempts: {
        type: Number,
        default: 0,
        required: true,
        maxValue: 3
    },
}, {timestamps: true})

const Otp = mongoose.model('Otp', OtpSchema)

export default Otp;

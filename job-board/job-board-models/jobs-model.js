import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.trim() !== ''
            },
            message: 'Job title can not be empty'
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val.trim() !== ''
            },
            message: 'Description title can not be empty'
        }
    },
    status: {
        type: String,
        default: 'PENDING',
        required: true
    }
})

const Jobs = mongoose.model('Jobs', JobSchema);

export default Jobs

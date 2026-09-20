import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        validate: {
            validator: function(value) {
                // Returns false (fails validation) if the trimmed length is 0
                return value.trim().length > 0;
            },
            message: 'Name cannot be an empty string.'
        }
    },
    completed: {type: Boolean, default: false},
    desc: String
})

const Task = mongoose.model('Task', taskSchema);

const findAll = async () => {
    return await Task.find()
}

const add = async (data) => {
    return await Task.create([...data])
}

const getOneTask = async (id) => {
    const task = await Task.findById({_id: id})
    return task
}

const updateTask = async (id, data) => {
    const task = await Task.findOneAndUpdate(
        {_id: id},
        {...data},
        {returnDocument: 'after'}
    )
    return task;
}

const deleteTask = async (id) => {
    const task = await Task.deleteOne({_id: id})
    return task
}

export {
    findAll,
    add,
    updateTask,
    deleteTask,
    getOneTask
}

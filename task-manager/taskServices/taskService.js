import { findAll, add, updateTask, deleteTask, getOneTask } from '../taskModels/taskModels.js'

const allTasks = () => {
    return findAll()
}

const addTask = (data) => {
    return add(data)
}

const getTask = (id) => {
    return getOneTask(id)
}

const update = (id, data) => {
    return updateTask(id, data)
}

const deleteT = (id) => {
    return deleteTask(id)
}

export {
    allTasks,
    getTask,
    update,
    addTask,
    deleteT
}

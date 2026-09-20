import express from 'express'

import {getSingleTask, getTasks, updateTask, createTask, deleteTask} from '../taskControllers/taskController.js'

const taskRoutes = express.Router()

taskRoutes
    .get('/', getTasks)
    .post('/', createTask)
    .get('/:id', getSingleTask)
    .patch('/:id', updateTask)
    .delete('/:id', deleteTask)

export default taskRoutes

import express from 'express'

import { createUser, getUser, getUsers, deleteUser, updateUser } from "../job-board-controllers/job-users-controller.js";

const userRoutes = express.Router()

userRoutes
    .post('/', createUser)
    .get('/', getUsers)
    .get('/:id', getUser)
    .patch('/:id', updateUser)
    .delete('/:id', deleteUser)

export default userRoutes

import express from 'express'

import {getUser, getUsers, deleteUser, updateUser } from "../job-board-controllers/job-users-controller.js";

const userRoutes = express.Router()

userRoutes
    .get('/', getUsers)
    .get('/:id', getUser)
    .patch('/:id', updateUser)
    .delete('/:id', deleteUser)

export default userRoutes

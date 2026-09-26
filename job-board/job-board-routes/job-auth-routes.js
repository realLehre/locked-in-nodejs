import express from 'express'

import { registerUser, loginUser } from "../job-board-controllers/job-auth-controller.js";

const authRoutes = express.Router()

authRoutes
    .post('/register', registerUser)
    .post('/login', loginUser)

export default authRoutes

import express from 'express'

import { registerUser, loginUser } from "../job-board-controllers/job-auth-controller.js";
import refreshToken from "../job-board-controllers/refresh-contoller.js";

const authRoutes = express.Router()

authRoutes
    .post('/register', registerUser)
    .post('/login', loginUser)
    .post('/token/refresh', refreshToken)

export default authRoutes

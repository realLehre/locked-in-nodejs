import express from 'express'

import { login, dashboard } from '../jwt-controllers/jwt-controllers.js'
import jwtMiddleware from "../jwt-middleware.js";

const jwtRoutes = express.Router()

jwtRoutes.post('/login', login).get('/dashboard', jwtMiddleware, dashboard)

export default jwtRoutes

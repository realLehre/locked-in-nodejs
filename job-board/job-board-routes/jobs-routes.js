import express from 'express'

import { createJob } from "../job-board-controllers/jobs-controller.js";

const jobRoutes = express.Router()

jobRoutes.post('/', createJob)

export default jobRoutes

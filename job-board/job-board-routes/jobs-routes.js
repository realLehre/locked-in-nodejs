import express from 'express'

import { getJobs, createJob, getJob, updateJob, deleteJob } from "../job-board-controllers/jobs-controller.js";
import jobAuthMiddleware from "../job-middlewares/job-auth-middleware.js";

const jobRoutes = express.Router()

jobRoutes
    .post('/', createJob)
    .get('/', getJobs)
    .get('/:id', jobAuthMiddleware, getJob)
    .patch('/:id', updateJob)
    .delete('/:id', deleteJob)

export default jobRoutes

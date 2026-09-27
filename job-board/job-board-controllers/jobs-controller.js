import {
    createJobService,
    getJobsService,
    findJobService,
    deleteJobService,
    editJobService
} from '../job-board-services/jobs-service.js'
import {success} from "../../utils/response-body.js";
import asyncWrapper from "../../utils/asyncHandler.js";
import NotFound from "../../errors/not-found.js";
import BadRequest from "../../errors/bad-request.js";

const getJobs = asyncWrapper(async (req, res) => {
    const jobs = await getJobsService()
    success(res, jobs)
})

const createJob = asyncWrapper(async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job  = await createJobService(req.body)
    success(res, job, 201)
})

const getJob = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const job = await findJobService(id)

    if(!job) {
        throw new NotFound('Job not found')
    }

    success(res, job)
})

const updateJob = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const job = await editJobService(data, id)

    success(res, job);
})

const deleteJob = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const job = await deleteJobService(id)

    success(res, job);
})

export {
    getJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob
}

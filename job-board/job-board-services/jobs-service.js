import Jobs from "../job-board-models/jobs-model.js";
import BadRequest from "../../errors/bad-request.js";
import NotFound from "../../errors/not-found.js";

const getJobsService = async () => {
    return await Jobs.find()
}

const createJobService = async (data) => {
    return await Jobs.create(data)
}

const findJobService = async (id) => {
    return await Jobs.findById(id);
}

const deleteJobService = async (id) => {
    const job  = await Jobs.deleteOne({_id: id});
    if(!job) {
        throw new NotFound('Job not found')
    }
    if(job.deletedCount === 0) {
        throw new NotFound('Job not found')
    }
    return job
}

const editJobService = async (data, id) => {
    if(!data || Object.keys(data).length === 0) {
        throw new BadRequest('Body is required')
    }

    const job = await Jobs.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {returnDocument: 'after'}
    )

    if(!job) {
        throw new NotFound('Job not found')
    }

    return job
}

export {
    createJobService,
    getJobsService,
    findJobService,
    deleteJobService,
    editJobService
}

import Jobs from "../job-board-models/jobs-model.js";

const createJobService = async (data) => {
    const job = await Jobs.create(data)
    return job
}

export { createJobService }

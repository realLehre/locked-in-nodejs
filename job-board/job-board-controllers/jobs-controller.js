import { createJobService } from '../job-board-services/jobs-service.js'
import {success} from "../../utils/response-body.js";

const createJob = async (req, res) => {
    const data = req.body;

    const job  = await createJobService(data)

    success(res, job)
}

export {
    createJob
}

import {StatusCodes} from "http-status-codes";

import TaskError from "../utils/error-class.js";

class BadRequest extends TaskError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequest

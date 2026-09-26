import {StatusCodes} from "http-status-codes";

import TaskError from "../utils/error-class.js";

class NotFound extends TaskError{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFound

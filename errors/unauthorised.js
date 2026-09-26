import TaskError from "../utils/error-class.js";
import {StatusCodes} from "http-status-codes";

class Unauthorised extends TaskError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export default Unauthorised

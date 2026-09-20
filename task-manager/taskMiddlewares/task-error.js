import {errorResponse} from "../../utils/response-body.js";

const erroHandler = (err, req, res, next) => {
    errorResponse(
        res,
        err.statusCode,
        err.message
    )
}

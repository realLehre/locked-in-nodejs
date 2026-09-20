import {errorResponse} from "./response-body.js";

const errorHandler = (err, req, res, next) => {
    errorResponse(
        res,
        err.statusCode,
        err.message
    );
};

export default errorHandler;

import {errorResponse} from "./response-body.js";

const errorHandler = (err, req, res, next) => {
    console.log(err)
    errorResponse(
        res,
        err.statusCode,
        err.message
    );
};

export default errorHandler;

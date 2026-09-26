import {errorResponse} from "./response-body.js";

const errorHandler = (err, req, res, next) => {
    console.log('\x1b[31mERROR:', err, '\x1b[0m')
    errorResponse(
        res,
        err.statusCode,
        err.message
    );
};

export default errorHandler;

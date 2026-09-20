const success = (res, data, status = 200, message) => {
    const result = {
        status: 'Success',
        data
    }

    if(message) {
        result.message = message
    }

    res.status(status).json(result)
}

const errorResponse = (res, statusCode = 500, message = 'An error occured') => {
    const result = {
        status: 'Error',
        message
    }

    res.status(statusCode).json(result)
}

export {
    success,
    errorResponse
}

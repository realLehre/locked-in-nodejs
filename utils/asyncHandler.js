const asyncWrapper = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res)
        } catch (err) {
            next(err)
        }
    }
}

export default asyncWrapper;

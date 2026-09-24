import jwt from 'jsonwebtoken'

import TaskError from "../utils/error-class.js";

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    try {
        const {userId, userName} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId, userName};
        next();
    } catch (error) {
        throw new TaskError('Token is invalid', 401)
    }
}

export default jwtMiddleware

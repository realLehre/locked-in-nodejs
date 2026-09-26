import Unauthorised from "../../errors/unauthorised.js";
import jwt from "jsonwebtoken";
import {getSingleUser} from "../job-board-services/job-users-service.js";

const jobAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers?.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Unauthorised('Unauthorized!')
    }
    const token = authHeader?.split(' ')[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = (await getSingleUser(user.userId))
        console.log(req.user)
        next()
    } catch (error) {
        throw new Unauthorised('Unauthorized!')
    }
}

export default jobAuthMiddleware;

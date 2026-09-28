import Unauthorised from "../../errors/unauthorised.js";
import jwt from "jsonwebtoken";

const jobAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers?.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Unauthorised('Unauthorized!')
    }
    const token = authHeader?.split(' ')[1];

    try {
        const {name, userId} = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {name, userId}
        next()
    } catch (error) {
        throw new Unauthorised('Unauthorized!')
    }
}

export default jobAuthMiddleware;

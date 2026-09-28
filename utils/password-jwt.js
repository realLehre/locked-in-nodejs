import jwt from 'jsonwebtoken';
import Unauthorised from "../errors/unauthorised.js";

const genPasswordToken =  () => {
    return jwt.sign(
        {},
        process.env.JWT_PASSWORD_SECRET,
        {expiresIn: process.env.JWT_PASSWORD_EXPIRES}
    )
}

const verifyPasswordToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_PASSWORD_SECRET)
    } catch (e) {
        throw new Unauthorised('Access denied!')
    }
}

export {
    genPasswordToken,
    verifyPasswordToken
}

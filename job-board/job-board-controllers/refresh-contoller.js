import asyncWrapper from "../../utils/asyncHandler.js";
import Unauthorised from "../../errors/unauthorised.js";
import jwt from "jsonwebtoken";
import {success} from "../../utils/response-body.js";
import BadRequest from "../../errors/bad-request.js";

const refreshToken = asyncWrapper(async (req, res) => {
    if(!req?.body) {
        throw new BadRequest('Refresh token is required')
    }

    const {refreshToken} = req?.body;
    if(!refreshToken) throw new Unauthorised('Unauthorised!');

    try {
        const {name, userId} = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const token  = jwt.sign({name, userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})

        success(res, {token});
    } catch (error) {
        throw new Unauthorised('Unauthorised');
    }
})

export default refreshToken;

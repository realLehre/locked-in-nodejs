import asyncWrapper from "../../utils/asyncHandler.js";
import bcrypt from 'bcryptjs'

import {success} from "../../utils/response-body.js";
import NotFound from "../../errors/not-found.js";
import {register, login} from "../job-board-services/job-auth-service.js";
import BadRequest from "../../errors/bad-request.js";
import Unauthorised from "../../errors/unauthorised.js";
import {StatusCodes} from "http-status-codes";

const registerUser = asyncWrapper(async (req, res) => {
    const user  = await register(req.body)
    const token = user.genJWT();
    const userData = {
        user: {
            name: user.name,
            email: user.email
        },
        token
    }
    success(res, userData, 201)
})

const loginUser = asyncWrapper(async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new BadRequest('Please provide email and password');
    }

    const user = await login(email);

    if(!user) {
        throw new Unauthorised('Permission denied!');
    }

    const isPasswordMatched = await user.checkPassword(password)

    if(!isPasswordMatched) {
        throw new Unauthorised('Invalid credentials')
    }

    const token = user.genJWT();
    const userData = {
        user: {
            name: user.name,
            email: user.email
        },
        token
    }

    success(res, userData, StatusCodes.OK)
})

export {
   registerUser,
    loginUser
}

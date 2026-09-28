import asyncWrapper from "../../utils/asyncHandler.js";
import bcrypt from 'bcryptjs'

import {success} from "../../utils/response-body.js";
import NotFound from "../../errors/not-found.js";
import {register, login, changePassword} from "../job-board-services/job-auth-service.js";
import BadRequest from "../../errors/bad-request.js";
import Unauthorised from "../../errors/unauthorised.js";
import {StatusCodes} from "http-status-codes";
import sendEmail from "../job-board-services/email-service.js";
import {OtpTypes} from "../../utils/otp-types.js";
import {createAndSendOtp} from "../job-board-services/otp-service.js";

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

    const purpose = OtpTypes.LOGIN;

   await createAndSendOtp({email, userId: user._id, purpose});

    const userData = {
        user: {
            name: user.name,
            email: user.email,
            userId: user._id
        },
    }

    success(res, userData, StatusCodes.OK)
})

const updatePassword = asyncWrapper(async (req, res) => {
    if(!req?.body) {
        throw new BadRequest('Fields can not empty')
    }
    const {email, password} = req?.body;

    if(!email || !password) {
        throw new BadRequest('Fields can not empty')
    }

    const user = await changePassword(password, email);
    success(res, user)
})

export {
    registerUser,
    loginUser,
    updatePassword
}

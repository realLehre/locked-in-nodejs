import asyncWrapper from "../../utils/asyncHandler.js";

import {success} from "../../utils/response-body.js";
import {register, login, changePassword} from "../job-board-services/job-auth-service.js";
import BadRequest from "../../errors/bad-request.js";
import Unauthorised from "../../errors/unauthorised.js";
import {StatusCodes} from "http-status-codes";
import {OtpTypes} from "../../utils/otp-types.js";
import {createAndSendOtp} from "../job-board-services/otp-service.js";
import User from "../job-board-models/job-user-model.js";
import {verifyPasswordToken} from "../../utils/password-jwt.js";

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

const requestPasswordOtp = asyncWrapper(async (req, res) => {
    const {email} = req.body;

    if(!email) throw new BadRequest('Please provide an email');

    const user = await User.findOne({email})

    if(user) {
        await createAndSendOtp({
            email: user.email,
            userId: user._id,
            purpose: OtpTypes.PASSWORD_RESET
        })
    }

    success(res, {
        message: "If an account with that email exists, a password reset OTP has been sent."
    })
})

const updatePassword = asyncWrapper(async (req, res) => {
    if(!req?.body) {
        throw new BadRequest('Fields can not empty')
    }
    const {email, password, token} = req?.body;

    if(!email || !password) {
        throw new BadRequest('Fields can not empty')
    }

    verifyPasswordToken(token);

    const user = await changePassword(password, email);
    success(res, user)
})

export {
    registerUser,
    loginUser,
    updatePassword,
    requestPasswordOtp
}

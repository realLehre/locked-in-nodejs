import asyncWrapper from "../../utils/asyncHandler.js";
import BadRequest from "../../errors/bad-request.js";
import {resendOtp, verifyOtp} from "../job-board-services/otp-service.js";
import TaskError from "../../utils/error-class.js";
import User from "../job-board-models/job-user-model.js";
import {success} from "../../utils/response-body.js";
import {OtpTypes} from "../../utils/otp-types.js";
import {genPasswordToken} from "../../utils/password-jwt.js";

const verify = asyncWrapper(async (req,res) => {
    const {userId, otp, purpose} = req.body;

    if(!userId || !otp || !purpose) throw new BadRequest('Fields are required');

    const isVerified = await verifyOtp({userId, otp, purpose})

    if(!isVerified) throw new TaskError('Something went wrong');

    const user = await User.findById(userId)
    let userData;

    if(purpose === OtpTypes.LOGIN) {
        const token = user.genJWT();
        const refreshToken = await user.genAccessToken()

        userData = {
            status: 'Success',
            token,
            refreshToken,
            purpose
        }
    } else {
        const passwordToken = genPasswordToken();
        userData = {
            status: 'Success',
            token: passwordToken
        }
    }

    success(res, userData)
})

const resend = asyncWrapper(async (req, res) => {
    const {email, userId, purpose} = req.body;
    if(!userId || !email || !purpose) throw new BadRequest('Fields are required');
    await resendOtp({email, userId, purpose})
    success(res, {status: 'success', message: 'Otp sent, please check your email'})
})

export {
    verify,
    resend
}

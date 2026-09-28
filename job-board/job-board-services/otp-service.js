import Otp from '../job-board-models/otp-model.js'
import BadRequest from "../../errors/bad-request.js";
import bcrypt from "bcryptjs";
import generateOtp from "../../utils/generate-otp.js";
import sendEmail from "./email-service.js";
import NotFound from "../../errors/not-found.js";
import TaskError from "../../utils/error-class.js";

const createAndSendOtp = async ({email, userId, purpose}) => {
    const otpRaw = generateOtp()
    const otpHash = await bcrypt.hash(otpRaw, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await Otp.deleteMany({
        user: userId,
        purpose
    })

    const otp = await Otp.create({
        user: userId,
        email,
        otpHash,
        purpose,
        expiresAt
    })

    await sendEmail({email, purpose, otp: otpRaw})

    return otp;
}

const verifyOtp = async ({userId, otp, purpose}) => {
    const otpStored = await Otp.findOne({user: userId, purpose})

    if(!otpStored || otpStored.expiresAt < new Date(Date.now)) throw new BadRequest('Invalid or expired OTP');

    if(otpStored.attempts >= 3) {
        await otpStore.deleteOne();
        throw new BadRequest('Too many attempts, try again later');
    }

    const isValid = await bcrypt.compare(otp.toString(), otpStored.otpHash)

    if(!isValid) {
        otpStored.attempts += 1
        await otpStored.save()
        throw new BadRequest('Invalid or expired OTP');
    }

    await otpStored.deleteOne();

    return true
}

const resendOtp = async ({email, userId, purpose}) => {
    const otpStored = await Otp.findOne({user: userId, purpose})

    if(!otpStored) throw new NotFound('Invalid or expired otp');

    const one_Minute = 60 * 1000;

    const ellapsedTime = Date.now() - new Date(otpStored.createdAt).getTime();

    if(ellapsedTime < one_Minute) {
        const timeLeft = Math.ceil((one_Minute - ellapsedTime)/1000)

        throw new TaskError(`Try again after ${timeLeft} seconds`, 429)
    }

    await createAndSendOtp({
        email,
        userId,
        purpose,
    })
}

export {
    createAndSendOtp,
    verifyOtp,
    resendOtp
}

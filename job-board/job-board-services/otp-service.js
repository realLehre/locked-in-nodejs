import Otp from '../job-board-models/otp-model.js'
import BadRequest from "../../errors/bad-request.js";
import bcrypt from "bcryptjs";
import generateOtp from "../../utils/generate-otp.js";
import sendEmail from "./email-service.js";

const createOtp = async ({email, userId, purpose, name}) => {
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

    const emailT = await sendEmail({email, purpose, name, otp: otpRaw})

    console.log('email sent', emailT);

    return otp;
}

export {
    createOtp
}

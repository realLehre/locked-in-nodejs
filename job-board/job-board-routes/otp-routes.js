import express from 'express';
import {verify, resend} from "../job-board-controllers/otp-controllers.js";

const otpRoutes = express.Router();

otpRoutes.post('/verify', verify);
otpRoutes.post('/resend', resend);

export default otpRoutes;

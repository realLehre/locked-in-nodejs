import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({ apiKey: process.env.EMAIL_API_KEY });

const sendEmail = async ({email, purpose, otp}) => {
    let subject;
    let message;

    switch (purpose) {
        case 'EMAIL_VERIFICATION':
            subject = 'Verify your email';
            message = `Your verification code is ${otp}.`;
            break;

        case 'PASSWORD_RESET':
            subject = 'Password reset code';
            message = `Your password reset code is ${otp}.`;
            break;

        case 'LOGIN':
            subject = 'Login verification code';
            message = `Your login verification code is ${otp}.`;
            break;

        default:
            subject = 'Your verification code';
            message = `Your verification code is ${otp}.`;
    }
    return brevo.transactionalEmails.sendTransacEmail({
        subject: 'Hello from Brevo!',
        htmlContent: `<html><h2>Verification Code</h2><p>${message}</p><p>This code expires in 10 minutes.</p></html>`,
        sender: { name: 'Toreto from Job App', email: process.env.V_EMAIL },
        to: [{ email }],
    });
}

export default sendEmail;

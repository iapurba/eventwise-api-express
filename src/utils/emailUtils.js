import nodemailer from 'nodemailer';

export const sendOTP = (email, otp) => {

    const senderEmail = process.env.OTP_SENDER_EMAIL_ID;
    const appPassword = process.env.EMAIL_APP_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: appPassword,
        },
    });

    const mailOptions = {
        from: senderEmail,
        to: email,
        subject: 'OTP for Login',
        text: `Welcome to Eventwise. Your OTP for login is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};
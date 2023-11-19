import User from '../models/User.js';
import randomstring from 'randomstring';
import { sendOTP } from '../utils/emailUtils.js';
import constants from '../utils/constants.js';
import jwtUtils from '../utils/jwtUtils.js';

export const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        const otp = randomstring.generate({ length: 6, charset: 'numeric' });

        if (!user) {
            user = new User({
                email,
                otp,
                otpExpiration: new Date(Date.now() + 5 * 60 * 1000),
            });
            await user.save();
        } else {
            user.otp = otp;
            user.otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            await user.save()
        }

        sendOTP(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({
            email,
            otp,
            otpExpiration: { $gt: new Date() },
        });

        if (user) {
            const token = jwtUtils.signToken({ userId: user._id, email});
            res.status(200).json({ message: 'OTP verified successfully', token });
        } else {
            res.status(401).json({ message: 'Invalid or expired OTP' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: constants.STATUS_INTERNAL_SERVER_ERROR });
    }
};

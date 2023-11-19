import User from '../models/User.js';
import constants from '../utils/constants.js';
import jwtUtils from '../utils/jwtUtils.js';

export const registerUser = async (req, res) => {
    console.log("User ", req.body);
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: constants.AUTH_INVALID_CREDENTIALS });
        }
        const user = new User({ ...req.body });
        await user.save();
        // Generate payload and sign a JWT token
        const payload = { userId: user._id, email };
        const token = jwtUtils.signToken(payload);

        res.status(201).json({ message: constants.USER_REGISTERED, token , user: user});

    } catch (error) {
        res.status(400).json({ error: constants.STATUS_BAD_REQUEST });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: constants.AUTH_INVALID_CREDENTIALS });
        }
        const passwordMatches = await user.comparePassword(password);
        if (!passwordMatches) {
            return res.status(401).json({ error: constants.AUTH_INVALID_CREDENTIALS });
        }
        // Generate payload and sign a JWT token
        const payload = { userId: user._id, email };
        const token = jwtUtils.signToken(payload);

        res.status(200).json({ message: constants.LOGIN_SUCCESS, token });

    } catch (error) {
        res.status(400).json({ error: constants.STATUS_BAD_REQUEST });
    }
};
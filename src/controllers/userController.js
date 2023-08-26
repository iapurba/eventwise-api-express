import User from "../models/User.js";
import constants from "../utils/constants.js";

export const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: constants.STATUS_NOT_FOUND });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        res.status(200).json({ message: constants.USER_UPDATED, data: updatedUser });
    } catch (error) {
        res.status(400).json({ error: constants.USER_UPDATE_FAILED });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.parmas.userId;
    try {
        await User.findByIdAndRemove(userId);
        res.status(204).json({ message: constants.USER_DELETED });
    } catch (error) {
        res.status(400).json({ error: constants.USER_DELETION_FAILED });
    }
};

export const updatePassword = async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: constants.USER_NOT_FOUND });
        }
        const passwordMatches = await user.comparePassword(oldPassword);
        if (!passwordMatches) {
            return res.status(401).json({ message: constants.STATUS_UNAUTHORIZED_DETAILS });
        }
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: constants.PASSWORD_UPDATED });

    } catch (error) {
        res.status(500).json({
            error: {
                message: constants.STATUS_INTERNAL_SERVER_ERROR,
                details: "The provided data is invalid or an error occurred during the update."
            }
        });
    }
};
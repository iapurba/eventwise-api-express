import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "Not Found" });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.user._id;
    const updatedData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: "Update Failed" });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.user._id;
    try {
        await User.findByIdAndRemove(userId);
        res.status(204).json({ message: "User Deleted" });
    } catch (error) {
        res.status(400).json({ error: 'Deletion failed' });
    }
};
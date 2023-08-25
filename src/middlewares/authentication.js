import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Access denied. Token missing." });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token has expired. Please log in again." });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
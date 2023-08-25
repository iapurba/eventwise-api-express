import User from "../models/User.js";
import jwt from "jsonwebtoken";

const tokenExpiration = "10h";

export const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists." });
        }
        const user = new User({ name, email, password, role });
        user.save();

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: tokenExpiration });
        res.status(201).json({ message: "User registered successfully.", token });
    } catch (error) {
        res.status(400).json({ error: "Bad Request" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credential" });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid Credential" });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: tokenExpiration });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        // console.log(error);
        res.status(400).json({ error: "Bad Request" });
    }
};
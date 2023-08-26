import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "organizer", "admin"],
        default: "user",
        required: true,
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    this.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
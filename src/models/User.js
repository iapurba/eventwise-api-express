import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: String,
    otpExpiration: Date,
    password: String,
    phoneNumber: String,
    emailVerified: Boolean,
    phoneVerified: Boolean,
    profile: {
        firstName: String,
        lastName: String,
        profilePicture: String,
        bio: String,
        location: String,
    },
    address: {
        addressLine1: String,
        addressLine2: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String,
    },
    paymentMethods: [],
    favouriteEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],
});

userSchema.set('timestamps', true);

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    this.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    emailVerified: Boolean,
    phoneVerified: Boolean,
    profile: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        profilePicture: String,
        bio: String,
        location: String,
    },
    address: {
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
            required: true,
        },
        landmark: String,
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
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

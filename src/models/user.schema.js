import mongoose from 'mongoose';
import authRoles from '../utils/authRoles.js';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide name field"],
            maxlength: [50, "please provide maximum of 120 characters"]
        },
        email: {
            type: String,
            required: [true, "Please provide email field"],
        },
        password: {
            type: String,
            required: [true, "Please provide password field"],
            minLength: [8, "please provide minimum of 8 characters for password"],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(authRoles),
            default: authRoles.USER
        },
        forgetPasswordToken: String,
        forgetPasswordExpiry: Date
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User",userSchema);
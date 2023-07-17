import mongoose from 'mongoose';
import authRoles from '../utils/authRoles.js';
import bcrypt from 'bcryptjs';
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

// Encrypt the password before saving it on mongoDB(mongoose hook)
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    return next();
});

// Writing custom methods for user schema
userSchema.methods = {
    // comparing user password and saved password in MONGODB
    compare: async function(userPassword) {
        return await bcrypt.compare(userPassword, this.password);
    }
}

export default mongoose.model("User",userSchema);
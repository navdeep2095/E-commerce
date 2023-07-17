import mongoose from 'mongoose';
import authRoles from '../utils/authRoles.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import config from '../config/config.js';
import crypto from 'crypto';

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
    },

    // Providing token to user once it enters the correct password
    getJWTToken: function() {
        JWT.sign({_id: this._id, role: this.role},config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY
        });
    },

    // Providing JWT Token to user
    getJWTForgetPasswordToken: function () {
        const forgotToken = crypto.randomBytes(20).toString("hex");
        
        // Encrypt the token generated by crypto
        this.forgetPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        this.forgetPasswordExpiry = Date.now() + 20*60*1000;

        return forgotToken;
    }
}

export default mongoose.model("User",userSchema);
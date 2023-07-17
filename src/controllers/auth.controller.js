import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import User from '../models/user.schema.js';

export const cookieOptions = {
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly: true
}

const signup = asyncHandler(async(req, res, next) => { 
    const {username, password, email} = req.body();

    // Validation
    // custom error class to handle the errors
    if(!username || !password || !email) {
        throw new CustomError("Please check the credentials",400);
    }


    // Add data to database using user schema
    // check if the user exists or not
    const existingUser = await User.findOne({email});

    if(existingUser) throw new CustomError("User already exist", 400);

    // otherwise create a user
    const newUser = await User.create({name, email, password});

    // create token for the new user
    const newToken = newUser.getJWTToken();

    // password as undefined as mongoose will return password as well during creation of the user, from the second time
    //  onwards it will not
    newUser.password = undefined;

    // store newuser token in user's cookie
    res.cookie("token", newToken, cookieOptions);

    // response of 200 with token and user object
    res.status(200).json({
        success: true,
        user: newUser,
        token
    });
});
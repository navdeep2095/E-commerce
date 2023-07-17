import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import User from '../models/user.schema.js';

export const cookieOptions = {
    // cookie will expire in 3 days
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly: true
}

export const signup = asyncHandler(async (req, res) => { 
    const {username, password, email} = req.body;

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

export const login = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        throw new CustomError("Please fill all the credentials", 400);
    }

    const loggedUser = User.findOne({email}).select("+password");

    if(!loggedUser) {
        throw new CustomError("Please check the credentials", 400);
    }

    const isPasswordCorrect = await loggedUser.compare(password);

    if(isPasswordCorrect) {
        const token = loggedUser.getJWTToken();

        // password as undefined as mongoose will return password as well during creation of the user, from the second time
        //  onwards it will not
        loggedUser.password = undefined;

        res.cookie("token", token, cookieOptions);
        return res.status(200).json({
            success: true,
            token,
            user:loggedUser
        });
    }

    throw new CustomError("Password is incorrect", 400);
});

export const logout = asyncHandler( async () => {
    res.cookie("token", null, {
       expires: new Date(Date.now()),
       httpOnly: true 
    });

    res.status(200).json({
        success: true,
        message: "User Logged Out"
    });
});
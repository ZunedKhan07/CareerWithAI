import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async(req, res) => {
    const {userName, email, password} = req.body;

    if([userName, email, password].some((field) => !field || field?.trim() === "")){
        throw new ApiErrors(400, "All Fields are required!")
    }

    const existedUser = await User.findOne({ $or : [{userName}, {email}] });
    if (existedUser) {
        throw new ApiErrors(404, "User Already Exist!")
    }

    const user = await User.create({ userName, email, password });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiErrors(500, "Something went wrong while registering the user.")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully! 🎉")
    )
})

const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new ApiErrors(400, "All fields are required!")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiErrors(404, "User not found, Please register first!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiErrors(401, "Invalid User Credentials!")
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    const loggedInUser = await User.findById(user._id).select("-password");
    if (!loggedInUser) {
        throw new ApiErrors(500, "Something went wrong while login the user.")
    }

    console.log("User found:", user);
console.log("Password match:", isPasswordValid);
    const option = {
        httpOnly: true,
        secure: false, // localhost pe false
        sameSite: "lax"
    }

    console.log("Cookies:", req.cookies);
    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
        new ApiResponse(
            200,
            { user: loggedInUser, accessToken, refreshToken },
            "User logged in successfully!"
        )
    );
    
});

const logoutUser = asyncHandler( async(req, res) => {
    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new ApiResponse(200, {}, "User Logged Out Successfully!")
        )
})

export {
    registerUser,
    loginUser,
    logoutUser
}
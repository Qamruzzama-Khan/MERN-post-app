import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const signupUser = asyncHandler(
    async (req, res) => {
        const { username, email, password } = req.body

        if (
            [ email, username, password].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser?.username === username) {
            throw new ApiError(409, "User with this username already exists")
        }

        if (existedUser?.email === email) {
            throw new ApiError(409, "User with this email already exists")
        }

        const profileImageLocalPath = req.file?.path;
        console.log(profileImageLocalPath)

        if (!profileImageLocalPath) {
            throw new ApiError(400, "Profile image file is required")
        }

        const profileImage = await uploadCloudinary(profileImageLocalPath)

        if (!profileImage) {
            throw new ApiError(400, "Profile image file is required")
        }

        const user = await User.create({
            username: username.toLowerCase(),
            email,
            password,
            profileImage: {
                imageUrl: profileImage.url,
                imageId: profileImage.public_id
            }
        })


        const createdUser = await User.findById(user._id).select( 
            "-password -refreshToken"
        )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )

    }
)

const loginUser = asyncHandler(
    async (req, res) => {
        const { username, email, password } = req.body;

        if (!username && !email) {
            throw new ApiError(400, "username or email required")
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (!user) {
            throw new ApiError(404, "Invalid user credentials")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken
                    },
                    "User logged in successfully"
                )
            )
    }
)

const updateUser = asyncHandler(
    async (req, res) => {
        const id = req.params.id;
        const { username, email } = req.body

        const user = await User.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        
        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;

        const profileImageLocalPath = req.file?.path;
        console.log(profileImageLocalPath)

        if (profileImageLocalPath) {
            const publicId = user.profileImage?.imageId;

            console.log(publicId)

            // Delete old image if exists
            // if (publicId) {
            //     try {
            //         const response = await deleteCloudinary(publicId);
            //         console.log(response);
            //     } catch (error) {
            //         throw new ApiError(500, "Error deleting old image");
            //     }
            // }

            try {
                const profileImage = await uploadCloudinary(profileImageLocalPath);
                updatedFields.profileImage = {
                    imageUrl: profileImage.url,
                    imageId: profileImage.public_id,
                };
            } catch (error) {
                throw new ApiError(500, "Error uploading new image");
            }
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        const updatedUser = await User.findByIdAndUpdate(id, { $set: updatedFields }, { new: true }).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: updatedUser, accessToken
                    },
                    "User updated successfully"
                )
            );
    }
)

// get user by Id
const getOneUser = asyncHandler(
    async (req, res) => {
        const id = req.params.id;

            const user = await User.findById(id)
            
            if (!user) {
                throw new ApiError(404, "User not found");
            }

            return res.status(200).json(new ApiResponse(200, user, "success"));
    }
)

export { signupUser, loginUser, updateUser, getOneUser }
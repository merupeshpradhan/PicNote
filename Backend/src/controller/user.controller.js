import { User } from "../models/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const userSignup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400,"User cannot upload here image.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!userName || !email || !password) {
    throw new ApiError(400,"New user please provide your all detials.");
  }

  const otherEmail = await User.findOne({ email });
  if (otherEmail) {
    throw new ApiError(400,"This email user already exist in our area.");
  }

  const user = await User.create({
    avatar,
    userName,
    email,
    password,
  });

  const userData = {
    id: user._id,
    avatar: user.avatar,
    userName: user.userName,
    email: user.email,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, userData, "User register successfully."));
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400,"Please provide email and password.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400,"Please provide correct email.");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect password.");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  res.cookie("accessToken", accessToken, option);
  res.cookie("refreshToken", refreshToken, option);

  const userData = {
    id: user._id,
    avatar: user.avatar,
    userName: user.userName,
    email: user.email,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, userData, "User login successfully."));
});
const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logout successfuly."));
});

export { userSignup, userLogin, userLogout };

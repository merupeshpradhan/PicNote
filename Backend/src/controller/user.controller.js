import jwt from "jsonwebtoken";
import { User } from "../models/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// GLOBAL Cookie Options (works for localhost + production)
const cookieOptions = {
  httpOnly: true,
  secure: true, // required for cross-site cookies
  sameSite: "none",
};

// =========================
//   REFRESH ACCESS TOKEN
// =========================
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Refresh token missing");
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);
    if (!user) throw new ApiError(401, "User not found");

    // check stored refresh token
    if (!user.refreshToken || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // generate new access token
    const newAccessToken = user.generateAccessToken();

    // send new cookie
    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.status(200).json(
      new ApiResponse(
        200,
        { accessToken: newAccessToken },
        "New access token issued"
      )
    );
  } catch (error) {
    return res.status(401).json(new ApiError(401, "Invalid refresh token"));
  }
};

// =========================
//         SIGNUP
// =========================
export const userSignup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) throw new ApiError(400, "Please provide avatar image.");
  if (!firstName || !lastName || !email || !password)
    throw new ApiError(400, "Please provide all required details.");

  const otherEmail = await User.findOne({ email });
  if (otherEmail) throw new ApiError(400, "This email is already registered.");

  // create user without avatar first
  let user = new User({ firstName, lastName, email, password });

  const publicId = `user_${user._id}_avatar`;

  const avatarUpload = await uploadOnCloudinary(avatarLocalPath, publicId);
  if (!avatarUpload) throw new ApiError(400, "Avatar upload failed");

  user.avatar = avatarUpload.secure_url;
  user.avatarPublicId = avatarUpload.public_id;

  await user.save();

  const userData = {
    id: user._id,
    avatar: user.avatar,
    avatarPublicId: user.avatarPublicId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, userData, "User registered successfully."));
});

// =========================
//          LOGIN
// =========================
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Please provide email and password.");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Email not found.");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new ApiError(400, "Incorrect password.");

  const accessToken = user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // set cookies
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  const userData = {
    id: user._id,
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, userData, "User login successful."));
});

// =========================
//       UPDATE USER
// =========================
export const updateUserDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const avatarLocalPath = req.file?.path;
  const user = req.user;

  if (!user) throw new ApiError(401, "Unauthorized request");

  if (avatarLocalPath) {
    const publicId = `user_${user._id}_avatar`;
    const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath, publicId);
    if (uploadedAvatar) {
      user.avatar = uploadedAvatar.secure_url;
      user.avatarPublicId = uploadedAvatar.public_id;
    }
  }

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (email) user.email = email;

  await user.save();

  const updatedData = {
    id: user._id,
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, updatedData, "Profile updated successfully."));
});

// =========================
//          LOGOUT
// =========================
export const userLogout = asyncHandler(async (req, res) => {
  if (req.user?._id) {
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
  }

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logout successful."));
});

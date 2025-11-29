import jwt from "jsonwebtoken";
import { User } from "../models/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) throw new ApiError(401, "Refresh token missing");

    // verify refresh token
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) throw new ApiError(401, "User not found");

    // better check (handles null or mismatch)
    if (!user.refreshToken || user.refreshToken !== incomingRefreshToken)
      throw new ApiError(401, "Invalid refresh token");

    // generate new access token
    const newAccessToken = user.generateAccessToken();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // secure: true,
      // sameSite: "none",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res
      .status(200)
      .json(
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

const userSignup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide avatar image.");
  }

  if (!firstName || !lastName || !email || !password) {
    throw new ApiError(400, "Please provide all required details.");
  }

  const otherEmail = await User.findOne({ email });
  if (otherEmail) {
    throw new ApiError(400, "This email is already registered.");
  }

  // create user first without avatar
  let user = new User({ firstName, lastName, email, password });

  // make unique + friendly publicId using user._id
  const publicId = `user_${user._id}_avatar`;

  // upload avatar
  const avatarUpload = await uploadOnCloudinary(avatarLocalPath, publicId);
  if (!avatarUpload) {
    throw new ApiError(400, "Avatar upload failed");
  }

  // save avatar info into user object
  user.avatar = avatarUpload.secure_url;
  user.avatarPublicId = avatarUpload.public_id;

  // const user = await User.create({
  //   avatar: avatar.secure_url,
  //   userName,
  //   email,
  //   password,
  // });

  // save the user to DB
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

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Please provide correct email.");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect password.");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // Save refreshToken in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // secure: true,
    // sameSite: "strict",
    // sameSite: "none",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.cookie("accessToken", accessToken, option);
  res.cookie("refreshToken", refreshToken, option);

  const userData = {
    id: user._id,
    avatar: user.avatar,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, userData, "User login successfully."));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const avatarLocalPath = req.file?.path;
  const user = req.user; // from authMiddleware

  if (!user) throw new ApiError(401, "Unauthorized request");

  // Upload new avatar if provided
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

// const userLogout = asyncHandler(async (req, res) => {
//   const user = req.user;
//   if (user) {
//     user.refreshToken = null;
//     await user.save({ validateBeforeSave: false });
//   }

//   const option = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   };

//   res.clearCookie("accessToken", option);
//   res.clearCookie("refreshToken", option);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "User logout successfully."));
// });

const userLogout = asyncHandler(async (req, res) => {
  if (req.user?._id) {
    // remove refresh token from DB
    await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
  }

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // secure: true,
    // sameSite: "none",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  res.clearCookie("accessToken", option);
  res.clearCookie("refreshToken", option);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logout successfully."));
});

export { userSignup, userLogin, updateUserDetails, userLogout };

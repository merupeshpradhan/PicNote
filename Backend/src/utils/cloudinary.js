import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("\n CLOUDINARY KEY : ", process.env.CLOUDINARY_API_KEY);

const uploadOnCloudinary = async (localFilePath,publicId) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      public_id: publicId, // pass unique + friendly name here
      overwrite: true, // update if same public_id
    });

    console.log("\n ✅ Cloudinary upload success  :", response.secure_url);

    fs.unlinkSync(localFilePath); // remove file from server
    return response;
  } catch (error) {
    console.log("\n ❌ Cloudinary upload error  :", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

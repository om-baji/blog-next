"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(base64File: string): Promise<string> {
    try {
        const uploadResponse = await cloudinary.uploader.upload(base64File, {
            resource_type: "auto",
        });

        return uploadResponse.secure_url;
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Failed to upload file");
    }
}

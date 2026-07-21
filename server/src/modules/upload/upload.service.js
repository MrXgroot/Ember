import cloudinary from "../../config/cloudinary.js";
export function createSignature() {
  const timestamp = Math.round(Date.now() / 1000);

  const folder = "ember/posts";

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder,
    },
    process.env.CLOUDINARY_API_SECRET,
  );

  return {
    timestamp,
    signature,
    folder,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  };
}

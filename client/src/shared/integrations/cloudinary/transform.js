const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function getMediaUrl(publicId, transformations = "f_auto,q_auto") {
  if (!publicId) {
    return "";
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

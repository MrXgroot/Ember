export function getConvertedWebpUrl(url) {
  if (!url) return null;

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace("/upload/", "/upload/f_webp,q_auto/");
}

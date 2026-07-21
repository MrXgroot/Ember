import { createSignature } from "./upload.service.js";

export function getUploadSignature(req, res) {
  const data = createSignature();

  return res.status(200).json({
    message: "Upload signature generated successfully.",
    data,
  });
}

import cloudinary from "../config/cloudinary.js";

export const cloudinaryUpload = (buffer,id, folder, resourceType="image") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id:id,
        resource_type: resourceType
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });
};

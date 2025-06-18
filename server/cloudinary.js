const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'avatars' },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          return reject(error);
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const deleteFromCloudinary = async (url) => {
  try {
    const publicId = url.split('/').slice(-1)[0].split('.')[0];
    await cloudinary.uploader.destroy(`avatars/${publicId}`);
  } catch (err) {
    console.error('❌ Cloudinary delete error:', err);
  }
};

// ✅ Proper export — DO NOT overwrite with module.exports = cloudinary
module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};

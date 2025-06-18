const sharp = require('sharp');
const User = require('../Models/UserModel');
const { uploadToCloudinary, deleteFromCloudinary } = require('../cloudinary');

exports.uploadAvatar = async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize(256, 256)
      .png()
      .toBuffer();
            

      const result = await uploadToCloudinary(buffer);
console.log(result)
      const user = await User.findById(req.userId);
      if (user.avatarUrl) await deleteFromCloudinary(user.avatarUrl);
      console.log(user.avatarUrl)

    user.avatarUrl = result.secure_url;
    await user.save();

    res.json({ avatarUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ msg: 'Upload error' });
  }
};

exports.deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.avatarUrl) {
      await deleteFromCloudinary(user.avatarUrl);
      user.avatarUrl = 'https://docs.gravatar.com/wp-content/uploads/2025/02/avatar-mysteryperson-20250210-256.png';
      await user.save();
    }
    res.json({ msg: 'Avatar removed' });
  } catch {
    res.status(500).json({ msg: 'Delete error' });
  }
};

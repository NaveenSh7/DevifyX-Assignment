const express = require('express');
const multer = require('multer');
const auth = require('../Middlewares/authMiddleware');
const { uploadAvatar, deleteAvatar } = require('../Controllers/avatarController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (['image/jpeg', 'image/png'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPEG or PNG allowed'));
  },
});

router.post('/upload', auth, upload.single('avatar'), uploadAvatar);
router.delete('/delete', auth, deleteAvatar);

module.exports = router;

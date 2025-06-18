const express = require('express');
const router = express.Router();
const { signup, login, me } = require('../Controllers/authController');
const auth = require('../Middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, me);

module.exports = router;

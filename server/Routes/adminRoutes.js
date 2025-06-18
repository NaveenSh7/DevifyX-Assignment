const express = require('express');
const auth = require('../Middlewares/authMiddleware');
const User = require('../Models/UserModel'); 

const router = express.Router();

router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'email avatarUrl'); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

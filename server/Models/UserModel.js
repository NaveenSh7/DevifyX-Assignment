const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, default: 'https://docs.gravatar.com/wp-content/uploads/2025/02/avatar-mysteryperson-20250210-256.png' },
  role :{type:String , default:'user'}
 
});

module.exports = mongoose.model('User', userSchema);

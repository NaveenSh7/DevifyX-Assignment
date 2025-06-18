const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./Routes/authRoutes');
const avatarRoutes = require('./Routes/avatarRoutes');
const adminRoutes = require('./Routes/adminRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/avatar', avatarRoutes);
app.use('/api/admin', adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));

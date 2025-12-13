const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const trackRoutes = require('./routes/trackRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(authMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
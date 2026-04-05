const mongoose = require('mongoose');

// Render par hum MONGO_URI set karenge
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
    console.error('ERROR: MongoDB Connection String missing in Environment Variables!');
}

mongoose.connect(mongoUri)
    .then(() => console.log('✅ Connected to MongoDB Atlas successfully!'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1); // Server stop kar do agar DB connect na ho
    });

module.exports = mongoose.connection;
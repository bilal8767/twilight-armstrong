require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// DB Connection Import
require('./db');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose Schema
const submissionSchema = new mongoose.Schema({
    userEmail: String,
    name: String,
    address: String,
    propertyType: String,
    propertyName: String,
    energieausweisPath: String,
    heizungsbauerPath: String,
    timestamp: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ml_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    },
});

const upload = multer({ storage });

// API Route - Form Submission
app.post('/api/submissions', upload.fields([
    { name: 'energie', maxCount: 1 },
    { name: 'heizung', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('Body:', req.body);
        const { userEmail, name, address, propertyDetails, property } = req.body;

        const energiePath = req.files?.energie ? req.files.energie[0].path : null;
        const heizungPath = req.files?.heizung ? req.files.heizung[0].path : null;

        const newSubmission = new Submission({
            userEmail,
            name,
            address,
            propertyType: propertyDetails,
            propertyName: property,
            energieausweisPath: energiePath,
            heizungsbauerPath: heizungPath
        });

        const saved = await newSubmission.save();
        res.status(201).json({ message: 'Success!', id: saved._id });

    } catch (error) {
        console.error('Submission Error:', error.message);
        res.status(500).json({ error: 'Global server error', message: error.message });
    }
});

// Test route
app.get('/', (req, res) => res.send('Backend is running!'));

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
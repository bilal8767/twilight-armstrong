require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('CLOUDINARY_CLOUD_NAME exists:', !!process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY exists:', !!process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET exists:', !!process.env.CLOUDINARY_API_SECRET);

async function startServer() {
    try {
        if (!mongoUri) {
            throw new Error('MongoDB URI is missing');
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000
        });

        console.log('Connected to MongoDB Atlas');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('MongoDB startup connection error:', error);
    }
}

startServer();

// Mongoose Schema
const submissionSchema = new mongoose.Schema({
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
        folder: 'mobile_wizard_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
    },
});

const upload = multer({ storage });

// API Route to handle form submission
app.post('/api/submissions', upload.fields([
    { name: 'energie', maxCount: 1 },
    { name: 'heizung', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('Incoming submission body:', req.body);
        console.log('Incoming submission files:', req.files);

        const { name, address, propertyDetails, property } = req.body;

        const energiePath = req.files?.energie ? req.files.energie[0].path : null;
        const heizungPath = req.files?.heizung ? req.files.heizung[0].path : null;

        const newSubmission = new Submission({
            name,
            address,
            propertyType: propertyDetails,
            propertyName: property,
            energieausweisPath: energiePath,
            heizungsbauerPath: heizungPath
        });

        const saved = await newSubmission.save();

        res.status(201).json({
            message: 'Submission saved successfully to MongoDB & Cloudinary!',
            submissionId: saved._id
        });

    } catch (error) {
        console.error('Submission error full:', error);
        console.error('Submission error message:', error.message);
        console.error('Submission error stack:', error.stack);
        console.error('Request body:', req.body);
        console.error('Request files:', req.files);

        res.status(500).json({
            error: 'Submission failed',
            message: error.message,
            stack: error.stack
        });
    }
});

// API Route to fetch all submissions
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ timestamp: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch submissions from database.',
            message: error.message
        });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global server error:', err);
    res.status(500).json({
        error: 'Global server error',
        message: err.message,
        stack: err.stack
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
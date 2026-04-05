require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const PORT = process.env.PORT || 10000; // Render usually uses 10000

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

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
        // Agar aapne preset banaya hai to niche wali line uncomment karein, 
        // warna default settings hi kafi hain.
        // upload_preset: 'ml_uploads', 
    },
});

const upload = multer({ storage });

// API Route to handle form submission
app.post('/api/submissions', upload.fields([
    { name: 'energie', maxCount: 1 },
    { name: 'heizung', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('Data received:', req.body);

        const { userEmail, name, address, propertyDetails, property } = req.body;

        // Cloudinary se jo URLs milay hain unhein extract karna
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
        console.log('Saved to DB:', saved._id);

        res.status(201).json({
            message: 'Submission saved successfully!',
            submissionId: saved._id
        });

    } catch (error) {
        console.error('SERVER ERROR:', error);
        res.status(500).json({
            error: 'Submission failed',
            message: error.message
        });
    }
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running smoothly!');
});

// MongoDB Connection and Server Start
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
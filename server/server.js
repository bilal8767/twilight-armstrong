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
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

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
const upload = multer({ storage: storage });

// API Route to handle form submission
app.post('/api/submissions', upload.fields([
    { name: 'energie', maxCount: 1 },
    { name: 'heizung', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, address, propertyDetails, property } = req.body;
        
        // Get Cloudinary URLs if files were uploaded
        const energiePath = req.files['energie'] ? req.files['energie'][0].path : null;
        const heizungPath = req.files['heizung'] ? req.files['heizung'][0].path : null;

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
            message: "Submission saved successfully to MongoDB & Cloudinary!",
            submissionId: saved._id 
        });

    } catch (error) {
        console.error("Submission error:", error);
        res.status(500).json({ error: "An unexpected error occurred." });
    }
});

// API Route to fetch all submissions
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ timestamp: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        console.error("Database fetch error:", error);
        res.status(500).json({ error: "Failed to fetch submissions from database." });
    }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all route to serve the React frontend for any non-API requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

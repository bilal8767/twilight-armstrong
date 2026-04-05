import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// Mongoose Schema
const submissionSchema = new mongoose.Schema({
    name: String,
    userEmail: String,
    address: String,
    propertyType: String,
    propertyName: String,
    energieausweisPath: String,
    heizungsbauerPath: String,
    timestamp: { type: Date, default: Date.now }
});

// Use existing model if already compiled (to prevent OverwriteModelError in Serverless envs)
const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

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
        const { name, address, propertyDetails, property, userEmail } = req.body;
        
        const energiePath = req.files && req.files['energie'] ? req.files['energie'][0].path : null;
        const heizungPath = req.files && req.files['heizung'] ? req.files['heizung'][0].path : null;

        const newSubmission = new Submission({
            name,
            userEmail,
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

// API Route to fetch submissions by user email
app.get('/api/submissions/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // Also support old submissions without an email in a real app, but for this constraint we filter strictly by userEmail
        const submissions = await Submission.find({ userEmail: email }).sort({ timestamp: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        console.error("Database fetch error:", error);
        res.status(500).json({ error: "Failed to fetch user submissions." });
    }
});

// Export the app for Vercel Serverless Functions instead of app.listen()
export default app;

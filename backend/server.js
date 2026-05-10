require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// CORS configuration - Allow Vercel frontend
// CORS configuration - Add your exact Vercel URL
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://abhilash-portfolio-xi.vercel.app',  // Your exact URL
        'https://abhilash-portfolio.vercel.app',
        'https://abhilash-portfolio-git-main.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Define Project Schema
const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    techStack: [String],
    githubLink: String,
    liveLink: String,
    featured: Boolean,
    order: Number
});

const Project = mongoose.model('Project', projectSchema);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'API is running!' });
});

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        let projects = await Project.find().sort({ order: 1 });
        
        // If no projects in DB, return default ones
        if (projects.length === 0) {
            projects = [
                {
                    title: "AI Career Advisor",
                    description: "Full-stack career mentoring platform with AI chatbot (LLaMA-3.3-70B), JWT authentication, email OTP via AWS SES, and role-based access control.",
                    techStack: ["React", "Node.js", "MongoDB", "Groq AI", "AWS SES"],
                    githubLink: "https://github.com/abhilash10072007-svg/ai-career-advisor"
                },
                {
                    title: "Smart Doubt Exchange",
                    description: "Community Q&A platform with automated AI answering pipeline using Groq LLaMA-3.1-8B, duplicate detection via TF-IDF vectorization (90% precision).",
                    techStack: ["React", "Node.js", "MongoDB", "Flask", "scikit-learn"],
                    githubLink: "https://github.com/abhilash10072007-svg/smart-doubt-exchange"
                },
                {
                    title: "Gesture Control System",
                    description: "Real-time hand gesture recognition system achieving 30+ FPS using MediaPipe landmark detection.",
                    techStack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
                    githubLink: "https://github.com/abhilash10072007-svg/gesture-control"
                },
                {
                    title: "TourAte - Travel Platform",
                    description: "Luxury travel booking platform with responsive modular frontend using Vite + React + Bootstrap.",
                    techStack: ["React", "Vite", "Bootstrap"],
                    githubLink: "https://github.com/abhilash10072007-svg/tourate"
                }
            ];
        }
        
        res.json({ success: true, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Contact form endpoint
// Contact form endpoint - Simplified version
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        console.log(`\n📧 Contact Form Submission:`);
        console.log(`   Name: ${name}`);
        console.log(`   Email: ${email}`);
        console.log(`   Message: ${message}\n`);
        
        // Always return success without email sending for now
        res.status(200).json({ 
            success: true, 
            message: 'Message received! I will get back to you soon.' 
        });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(200).json({ 
            success: true, 
            message: 'Message received!' 
        });
    }
});
// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Atlas connected successfully!');
        console.log(`📊 Database: portfolio`);
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 API endpoints:`);
            console.log(`   GET  /api/health`);
            console.log(`   GET  /api/projects`);
            console.log(`   POST /api/contact`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('\n💡 Continuing without MongoDB...');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT} (without MongoDB)`);
            console.log(`📍 API endpoints available with fallback data`);
        });
    });// Redeploy trigger

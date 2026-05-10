cat > server.js << 'EOF'
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Import models
const Contact = require('./models/Contact');

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://abhilash-portfolio-xi.vercel.app',
        'https://abhilash-portfolio.vercel.app',
        'https://abhilash-portfolio-git-main.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

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

// Contact form endpoint - SAVES TO MONGODB
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide name, email, and message' 
            });
        }
        
        // Save to MongoDB
        const contact = new Contact({ name, email, message });
        await contact.save();
        
        console.log(`\n📧 Message SAVED to MongoDB:`);
        console.log(`   Name: ${name}`);
        console.log(`   Email: ${email}`);
        console.log(`   Message: ${message}`);
        console.log(`   ID: ${contact._id}\n`);
        
        res.json({ 
            success: true, 
            message: 'Message received! I will get back to you soon.' 
        });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Please try again later.' 
        });
    }
});

// Optional: Get all messages (admin only - protect this in production)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
        res.json({ success: true, count: contacts.length, contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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
            console.log(`   GET  /api/contacts (view messages)`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });
EOF
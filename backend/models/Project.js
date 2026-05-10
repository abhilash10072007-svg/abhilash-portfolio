const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    longDescription: {
        type: String,
        default: ''
    },
    techStack: [{
        type: String,
        trim: true
    }],
    githubLink: {
        type: String,
        default: ''
    },
    liveLink: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Project', projectSchema);
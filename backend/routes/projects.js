const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res) => {
    try {
        const { featured, limit = 10 } = req.query;
        let query = {};
        if (featured === 'true') query.featured = true;
        
        const projects = await Project.find(query)
            .sort({ order: 1, createdAt: -1 })
            .limit(parseInt(limit));
        
        res.json({
            success: true,
            count: projects.length,
            projects
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
});

// GET single project
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch project' });
    }
});

// POST create project (protected - admin only)
router.post('/',
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        
        try {
            const project = await Project.create(req.body);
            res.status(201).json({ success: true, project });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Failed to create project' });
        }
    }
);

// PUT update project (protected - admin only)
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update project' });
    }
});

// DELETE project (protected - admin only)
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete project' });
    }
});

module.exports = router;
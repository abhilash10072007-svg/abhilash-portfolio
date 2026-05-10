const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST contact form
router.post('/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('message').notEmpty().withMessage('Message is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        
        const { name, email, message } = req.body;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact from ${name}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };
        
        try {
            await transporter.sendMail(mailOptions);
            res.json({ success: true, message: 'Message sent successfully!' });
        } catch (error) {
            console.error('Email error:', error);
            res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
        }
    }
);

module.exports = router;
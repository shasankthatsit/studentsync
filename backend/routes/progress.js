const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Subject = require('../models/Subject');

// Get all subjects for a user
router.get('/', auth, async (req, res) => {
    try {
        const subjects = await Subject.find({ user: req.user.userId });
        res.json({
            success: true,
            subjects
        });
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching subjects'
        });
    }
});

// Create a new subject
router.post('/', auth, async (req, res) => {
    try {
        const { name, currentGrade, targetGrade, assignments } = req.body;
        
        const subject = new Subject({
            name,
            currentGrade,
            targetGrade,
            assignments,
            user: req.user.userId
        });

        await subject.save();
        
        res.status(201).json({
            success: true,
            subject
        });
    } catch (error) {
        console.error('Error creating subject:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating subject'
        });
    }
});

// Update a subject
router.put('/:id', auth, async (req, res) => {
    try {
        const subject = await Subject.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true }
        );

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found'
            });
        }

        res.json({
            success: true,
            subject
        });
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating subject'
        });
    }
});

// Delete a subject
router.delete('/:id', auth, async (req, res) => {
    try {
        const subject = await Subject.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found'
            });
        }

        res.json({
            success: true,
            message: 'Subject deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting subject'
        });
    }
});

// Add an assignment to a subject
router.post('/:id/assignments', auth, async (req, res) => {
    try {
        const { name, grade, weight } = req.body;
        
        const subject = await Subject.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found'
            });
        }

        subject.assignments.push({ name, grade, weight });
        await subject.save();

        res.json({
            success: true,
            subject
        });
    } catch (error) {
        console.error('Error adding assignment:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding assignment'
        });
    }
});

module.exports = router; 
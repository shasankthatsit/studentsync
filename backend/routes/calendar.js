const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');

// Get all events for a user
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.userId });
        res.json({
            success: true,
            events
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching events'
        });
    }
});

// Create a new event
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, startDate, endDate, color } = req.body;
        
        const event = new Event({
            title,
            description,
            startDate,
            endDate,
            color,
            user: req.user.userId
        });

        await event.save();
        
        res.status(201).json({
            success: true,
            event
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating event'
        });
    }
});

// Update an event
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            req.body,
            { new: true }
        );

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.json({
            success: true,
            event
        });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating event'
        });
    }
});

// Delete an event
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting event'
        });
    }
});

module.exports = router; 
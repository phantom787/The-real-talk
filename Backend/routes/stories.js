const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Get all stories
router.get('/', async (req, res) => {
    try {
        const stories = await Story.find().sort({ createdAt: -1 });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a new story
router.post('/', async (req, res) => {
    const { content, category } = req.body;
    const story = new Story({ content, category });
    try {
        const savedStory = await story.save();
        res.status(201).json(savedStory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

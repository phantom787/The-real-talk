const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const jwt = require('jsonwebtoken');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Admin login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if(username === ADMIN_USERNAME && password === ADMIN_PASSWORD){
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify admin
function verifyToken(req, res, next){
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

// Delete a story
router.delete('/story/:id', verifyToken, async (req, res) => {
    try {
        await Story.findByIdAndDelete(req.params.id);
        res.json({ message: 'Story deleted' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

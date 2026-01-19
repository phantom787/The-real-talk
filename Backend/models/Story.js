const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    content: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema);

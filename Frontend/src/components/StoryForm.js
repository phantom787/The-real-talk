import React, { useState } from 'react';
import axios from 'axios';

export default function StoryForm() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !category) {
      alert("Please enter content and category");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/stories`, { content, category });
      setContent('');
      setCategory('');
      alert("Thank you for sharing your story! 💌");
    } catch (err) {
      console.error(err);
      alert("Error submitting story. Check backend URL and that backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="story-form" className="story-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="How are you feeling today? Share anything, big or small…"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (e.g., Anxiety, Work, Relationships)"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Share Your Story 💌"}
      </button>
    </form>
  );
}

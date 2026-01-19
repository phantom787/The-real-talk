import { useState } from 'react';
import axios from 'axios';

export default function StoryForm() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !category) return;

    try {
      await axios.post('https://conquer-fm5l.onrender.com/api/stories', { content, category });
      setContent('');
      setCategory('');
      alert('Thank you for sharing your story! 💌');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Error submitting story.');
    }
  };

  return (
    <form id="story-form" className="story-form" onSubmit={handleSubmit}>
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
      <button type="submit">Share Your Story 💌</button>
    </form>
  );
}

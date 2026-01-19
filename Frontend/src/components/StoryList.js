import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StoryList({ selectedCategory }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/stories`);
        setStories(res.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching stories. Check backend URL and that backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [BACKEND_URL]);

  const filteredStories = selectedCategory === 'All'
    ? stories
    : stories.filter(story => story.category === selectedCategory);

  if (loading) return <p>Loading stories...</p>;
  if (filteredStories.length === 0) return <p>No stories yet.</p>;

  return (
    <div className="story-list">
      {filteredStories.map(story => (
        <div key={story._id} className="story-card">
          <p>{story.content}</p>
          <div className="story-meta">
            <small>Category: {story.category}</small>
            <button onClick={() => alert('Thanks for showing support! ❤️')}>I relate ❤️</button>
          </div>
        </div>
      ))}
    </div>
  );
}

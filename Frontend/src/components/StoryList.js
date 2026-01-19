import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StoryList({ selectedCategory }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('https://YOUR_BACKEND_URL/api/stories')
      .then(res => setStories(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredStories = selectedCategory === 'All'
    ? stories
    : stories.filter(story => story.category === selectedCategory);

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

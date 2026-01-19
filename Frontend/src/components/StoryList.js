import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StoryList() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('https://YOUR_RENDER_BACKEND_URL/api/stories')
             .then(res => setStories(res.data))
             .catch(err => console.log(err));
    }, []);

    return (
        <div className="story-list">
            {stories.map(story => (
                <div key={story._id} className="story-card">
                    <p>{story.content}</p>
                    <small>Category: {story.category}</small>
                </div>
            ))}
        </div>
    );
}

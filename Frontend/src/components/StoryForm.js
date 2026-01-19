import { useState } from 'react';
import axios from 'axios';

export default function StoryForm() {
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if(!content || !category) return;
        await axios.post('https://conquer-fm5l.onrender.com', { content, category });
        setContent('');
        setCategory('');
        window.location.reload(); // refresh to see new story
    };

    return (
        <form onSubmit={handleSubmit} className="story-form">
            <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                placeholder="Share your story anonymously..."
            />
            <input 
                type="text" 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                placeholder="Category"
            />
            <button type="submit">Submit</button>
        </form>
    );
}

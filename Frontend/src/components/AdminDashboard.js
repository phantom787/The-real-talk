import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
    const [token, setToken] = useState('');
    const [stories, setStories] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async e => {
        e.preventDefault();
        const res = await axios.post('https://conquer-fm5l.onrender.com', { username, password });
        setToken(res.data.token);
        fetchStories(res.data.token);
    };

    const fetchStories = async (token) => {
        const res = await axios.get('https://conquer-fm5l.onrender.com');
        setStories(res.data);
    };

    const deleteStory = async id => {
        await axios.delete(`https://conquer-fm5l.onrender.com/${id}`, {
            headers: { Authorization: token }
        });
        setStories(stories.filter(s => s._id !== id));
    };

    if(!token) return (
        <form onSubmit={login} className="admin-login">
            <h2>Admin Login</h2>
            <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    );

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            {stories.map(story => (
                <div key={story._id} className="story-card">
                    <p>{story.content}</p>
                    <small>Category: {story.category}</small>
                    <button onClick={() => deleteStory(story._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

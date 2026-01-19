import { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = "https://conquer-fm5l.onrender.com"; // <-- Replace with your deployed backend URL

export default function AdminDashboard() {
  const [showLogin, setShowLogin] = useState(false);
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [stories, setStories] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const secret = "niggah"; // optional secret before showing login

  // Verify secret code
  const verifyCode = (e) => {
    e.preventDefault();
    if (code === secret) setShowLogin(true);
    else alert("Wrong secret code!");
  };

  // Login function
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, { username, password });
      setToken(res.data.token);
      fetchStories(res.data.token);
    } catch (err) {
      console.error(err);
      alert('Invalid username or password');
    }
  };

  // Fetch all stories from backend
  const fetchStories = async (authToken) => {
    try {
      setLoading(true);
      const storiesRes = await axios.get(`${BACKEND_URL}/api/stories`, {
        headers: authToken ? { Authorization: authToken } : {}
      });
      setStories(storiesRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch stories:", err);
      setLoading(false);
      alert("Failed to load stories. Check backend URL and token.");
    }
  };

  // Delete a story
  const deleteStory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/story/${id}`, {
        headers: { Authorization: token }
      });
      setStories(stories.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete story.");
    }
  };

  // Render secret code screen
  if (!showLogin) {
    return (
      <form onSubmit={verifyCode} className="admin-login">
        <h2>Enter Admin Secret Code</h2>
        <input
          type="password"
          placeholder="Secret code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    );
  }

  // Render login screen
  if (!token) {
    return (
      <form className="admin-login" onSubmit={login}>
        <h2>Admin Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    );
  }

  // Render dashboard with stories
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading stories...</p>}

      {!loading && stories.length === 0 && <p>No stories yet.</p>}

      {!loading && stories.map(story => (
        <div key={story._id} className="story-card">
          <p>{story.content}</p>
          <small>Category: {story.category}</small>
          <button onClick={() => deleteStory(story._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

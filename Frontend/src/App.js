import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import AdminDashboard from './components/AdminDashboard';

function FloatingAdminButton() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Only show button if the user enters the secret key sequence
    const secretKey = ['a', 'd', 'm', 'i', 'n'];
    let pressedKeys = [];

    const keyListener = (e) => {
      pressedKeys.push(e.key.toLowerCase());
      if (pressedKeys.join('').includes(secretKey.join(''))) {
        setShowButton(true);
      }
      // Limit array size
      if (pressedKeys.length > secretKey.length) pressedKeys.shift();
    };

    window.addEventListener('keydown', keyListener);
    return () => window.removeEventListener('keydown', keyListener);
  }, []);

  if (!showButton) return null;

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 15px',
        borderRadius: '25px',
        background: '#6bbf8e',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        zIndex: 9999,
      }}
      onClick={() => navigate('/admin')}
    >
      Admin
    </button>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <Router>
      <FloatingAdminButton />
      <Routes>
        {/* Main page */}
        <Route path="/" element={
          <div className="App">
            <div className="hero">
              <h1>Welcome to Your Safe Space</h1>
              <p>Share anonymously. Read. Connect. Heal.</p>
              <button onClick={() => document.getElementById('story-form').scrollIntoView({ behavior: 'smooth' })}>
                Share Your Story
              </button>
            </div>

            <StoryForm />

            <div className="category-filter">
              <label>Filter by category: </label>
              <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                <option>All</option>
                <option>Anxiety</option>
                <option>Work</option>
                <option>Relationships</option>
                <option>Health</option>
                <option>Other</option>
              </select>
            </div>

            <StoryList selectedCategory={selectedCategory} />
          </div>
        } />

        {/* Admin page */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

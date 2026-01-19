import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <Router>
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

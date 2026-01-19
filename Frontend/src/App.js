import React, { useState } from 'react';
import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="App">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Your Safe Space</h1>
        <p>Share anonymously. Read. Connect. Heal.</p>
        <button onClick={() => document.getElementById('story-form').scrollIntoView({ behavior: 'smooth' })}>
          Share Your Story
        </button>
      </div>

      {/* Story Form */}
      <StoryForm />

      {/* Category Filter */}
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

      {/* Story List */}
      <StoryList selectedCategory={selectedCategory} />

      <hr />

      {/* Admin Dashboard */}
      <AdminDashboard />
    </div>
  );
}

export default App;

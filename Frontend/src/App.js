import StoryForm from './components/StoryForm';
import StoryList from './components/StoryList';
import AdminDashboard from './components/AdminDashboard';
import './styles.css';

function App() {
  return (
    <div className="App">
      <h1>Anonymous Stories</h1>
      <StoryForm />
      <StoryList />
      <hr />
      <AdminDashboard />
    </div>
  );
}

export default App;

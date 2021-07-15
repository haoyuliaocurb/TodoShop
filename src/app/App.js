// script
import { React } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
// import AppTrial from './AppTrial';

// styling
import 'normalize.css';
import '../styles/app/general.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

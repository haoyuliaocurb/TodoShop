/* eslint-disable no-unused-vars */
// script
import { React } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import TRIAL from './TRIAL';

// styling
import 'normalize.css';
import '../styles/app/general.css';

function App() {
  return (
    <Router>
      <AppContent />
      {/* <TRIAL /> */}
    </Router>
  );
}

export default App;

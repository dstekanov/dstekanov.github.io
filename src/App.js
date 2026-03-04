import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import HomePage from './components/HomePage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
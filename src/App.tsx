import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage';
import AcademyPage from './pages/AcademyPage';
import ApprenticeshipPage from './pages/ApprenticeshipPage';
import DocumentsPage from './pages/DocumentsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/apprenticeship" element={<ApprenticeshipPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <NavigationBar />
      </Box>
    </Router>
  );
}

export default App;

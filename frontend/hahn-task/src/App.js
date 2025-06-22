import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import JobList from './pages/JobList';
import JobDetail from './pages/JobDetail';
import JobForm from './pages/JobForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/jobs/new" element={<JobForm />} />
        <Route path="/jobs/:id/edit" element={<JobForm />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

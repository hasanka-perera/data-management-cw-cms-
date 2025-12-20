import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ClientList from './pages/ClientList';
import LeadList from './pages/LeadList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="leads" element={<LeadList />} />
          {/* Placeholder for details page if we implement it later */}
          <Route path="clients/:id" element={<Navigate to="/clients" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

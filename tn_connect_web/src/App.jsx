import React from 'react';
import { RouterProvider, Route } from './components/Router';
import { AdminLayout } from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import MemberManagement from './pages/MemberManagement';
import MemberDetails from './pages/MemberDetails';
import AuditLogs from './pages/AuditLogs';
import DataExport from './pages/DataExport';
import './index.css';

function App() {
  return (
    <RouterProvider>
      <AdminLayout>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/members" element={<MemberManagement />} />
        <Route path="/member/:id" element={<MemberDetails />} />
        <Route path="/logs" element={<AuditLogs />} />
        <Route path="/export" element={<DataExport />} />
      </AdminLayout>
    </RouterProvider>
  );
}

export default App;

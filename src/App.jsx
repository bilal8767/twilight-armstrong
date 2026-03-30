import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
// Pages
import LandingPage from './pages/LandingPage';
import MobileWizardPage from './pages/MobileWizardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PlumberLoginPage from './pages/PlumberLoginPage';
import PlumberRegisterPage from './pages/PlumberRegisterPage';
import PlumberDashboardPage from './pages/PlumberDashboardPage';
import DashboardPage from './pages/DashboardPage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailsPage from './pages/ModuleDetailsPage';
import ModuleFormPage from './pages/ModuleFormPage';


// Protected Route Component (For Normal Users)
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'plumber') return <Navigate to="/plumber-dashboard" replace />;
  return children;
};

// Plumber Route Component
const PlumberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/plumber/login" replace />;
  if (user.role !== 'plumber') return <Navigate to="/wizard" replace />;
  return children;
};

// Admin Route Component (For Admin Dashboard)
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/wizard" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Customer Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Plumber Auth */}
            <Route path="/plumber/login" element={<PlumberLoginPage />} />
            <Route path="/plumber/register" element={<PlumberRegisterPage />} />
          </Route>

          {/* Protected Routes */}
          <Route path="/wizard" element={
            <ProtectedRoute>
              <MobileWizardPage />
            </ProtectedRoute>
          } />

          <Route path="/plumber-dashboard" element={
            <PlumberRoute>
              <PlumberDashboardPage />
            </PlumberRoute>
          } />
          
          <Route path="/dashboard" element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="modules/new" element={<ModuleFormPage />} />
            <Route path="modules/:id" element={<ModuleDetailsPage />} />
            <Route path="modules/:id/edit" element={<ModuleFormPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

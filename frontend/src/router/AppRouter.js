import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import AdminPanel from '../admin/AdminPanel';
// Import new components for the routes you want to add
import LoginModal from '../components/LoginModal';
// You might need to create these components
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { ThemeProvider } from '../components/themecontext';
import { AuthProvider } from '../components/authcontext';
import ComplaintTrackingPage from '../Tracking/ComplaintTrackingPage';
const AppRouter = () => {
  return (
    <ThemeProvider>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Existing routes - preserved as requested */}
        <Route path="/" element={<App />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        
        <Route path="/tracking" element={<ComplaintTrackingPage />} />
        <Route path="/tracking/:complaintId" element={<ComplaintTrackingPage />} />
        {/* New routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* You can add more routes as needed */}
        <Route path="/report" element={<App reportSection="report" />} /> {/* This will pass a prop to indicate report section */}
        <Route path="/issues" element={<App reportSection="issues" />} /> {/* For viewing local issues */}
        <Route path="/profile" element={<App />} /> {/* For user profiles */}
        <Route path="/contact" element={<App />} /> {/* Contact page */}
        
        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
};

export default AppRouter;
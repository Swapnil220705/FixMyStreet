import React, { useState } from 'react';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import ReportManagement from './ReportManagement';
import AlertsNotifications from './AlertsNotifications';
import DataVisualization from './DataVisualization';
import AuditLogs from './AuditLogs';
import '../styles/Adminglobal.css';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../components/themecontext';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <ReportManagement />;
      case 'alerts':
        return <AlertsNotifications />;
      case 'visualization':
        return <DataVisualization />;
      case 'audit':
        return <AuditLogs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>FixMyStreet</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeSection === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveSection('reports')}
          >
            Report Management
          </button>
          <button 
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            User Management
          </button>
          <button 
            className={`nav-item ${activeSection === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveSection('alerts')}
          >
            Alerts & Notifications
          </button>
          <button 
            className={`nav-item ${activeSection === 'visualization' ? 'active' : ''}`}
            onClick={() => setActiveSection('visualization')}
          >
            Data Visualization
          </button>
          <button 
            className={`nav-item ${activeSection === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveSection('audit')}
          >
            Audit Logs
          </button>
        </nav>
      </div>
      <div className="admin-content">
        <header className="admin-header">
          <div className="admin-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="admin-user">
            <span className="notification-icon">🔔</span>
            <span className="user-avatar">👤</span>
            <span className="user-name">Admin User</span>
          </div>
        </header>
        <main className="admin-main">
          {renderSection()}
        </main>
      </div>
    </div>
    <ThemeToggle />
    </ThemeProvider>
  );
};

export default AdminPanel;

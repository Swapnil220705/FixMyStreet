import React, { useContext } from 'react';
import '../styles/admin/Dashboard.css';
import StatisticsCard from './components/StatisticsCard';
import MapVisualization from './components/MapVisualization';
import RecentActivity from './components/RecentActivity';
import PerformanceMetrics from './components/PerformanceMetrics';
import { ThemeContext } from '../components/themecontext'; // adjust path as needed

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext); // grab global dark mode value

  const statistics = {
    totalReported: 1248,
    resolved: 956,
    pending: 292,
    highSeverity: 187,
    mediumSeverity: 423,
    lowSeverity: 638
  };

  const recentActivity = [
    {
      id: 'REP-2025-1089',
      type: 'Pothole',
      location: '24 Park Avenue',
      severity: 'High',
      status: 'Pending',
      reportedAt: '2025-04-13T09:45:00',
      reportedBy: 'Rajesh Kumar'
    },
    {
      id: 'REP-2025-1088',
      type: 'Broken Pavement',
      location: 'Gandhi Road',
      severity: 'Medium',
      status: 'In Progress',
      reportedAt: '2025-04-13T08:30:00',
      reportedBy: 'Priya Sharma'
    },
    {
      id: 'REP-2025-1087',
      type: 'Road Damage',
      location: 'Nehru Street',
      severity: 'Low',
      status: 'Resolved',
      reportedAt: '2025-04-12T16:20:00',
      reportedBy: 'Amit Patel'
    },
    {
      id: 'REP-2025-1086',
      type: 'Pothole',
      location: 'MG Road',
      severity: 'High',
      status: 'In Progress',
      reportedAt: '2025-04-12T14:15:00',
      reportedBy: 'Sanjay Verma'
    },
    {
      id: 'REP-2025-1085',
      type: 'Crack in road',
      location: 'Indira Nagar',
      severity: 'Medium',
      status: 'Assigned',
      reportedAt: '2025-04-12T11:30:00',
      reportedBy: 'Neha Gupta'
    }
  ];

  const performanceMetrics = {
    averageResolutionTime: 48,
    issuesResolvedByDepartment: [
      { department: 'Roads & Infrastructure', resolved: 342 },
      { department: 'Public Works', resolved: 289 },
      { department: 'Municipal Services', resolved: 325 }
    ]
  };

  const mapIssues = [
    { id: 1, type: "Pothole", severity: "High", status: "Pending", lat: 28.6139, lng: 77.2090 },
    { id: 2, type: "Broken Pavement", severity: "Medium", status: "In Progress", lat: 28.6129, lng: 77.2295 },
    { id: 3, type: "Road Damage", severity: "Low", status: "Resolved", lat: 28.5929, lng: 77.2065 },
    { id: 4, type: "Pothole", severity: "High", status: "Pending", lat: 28.6339, lng: 77.2220 },
    { id: 5, type: "Street Light Broken", severity: "Medium", status: "Assigned", lat: 28.6039, lng: 77.1890 }
  ];

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>

      <div className="dashboard-summary">
        <div className="statistics-grid">
          <StatisticsCard title="Total Reports" value={statistics.totalReported} icon="📊" color="primary" darkMode={darkMode} />
          <StatisticsCard title="Resolved Issues" value={statistics.resolved} icon="✅" color="success" darkMode={darkMode} />
          <StatisticsCard title="Pending Issues" value={statistics.pending} icon="⏳" color="warning" darkMode={darkMode} />
          <StatisticsCard title="High Severity" value={statistics.highSeverity} icon="🔴" color="danger" darkMode={darkMode} />
          <StatisticsCard title="Medium Severity" value={statistics.mediumSeverity} icon="🟠" color="warning" darkMode={darkMode} />
          <StatisticsCard title="Low Severity" value={statistics.lowSeverity} icon="🟢" color="success" darkMode={darkMode} />
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-row">
          <div className="dashboard-col map-col">
            <div className={`dashboard-card ${darkMode ? 'dark-card' : ''}`}>
              <h2 className="card-title">Geographic Distribution</h2>
              <MapVisualization issues={mapIssues} darkMode={darkMode} />
            </div>
          </div>
          <div className="dashboard-col metrics-col">
            <div className={`dashboard-card ${darkMode ? 'dark-card' : ''}`}>
              <h2 className="card-title">Performance Metrics</h2>
              <PerformanceMetrics metrics={performanceMetrics} darkMode={darkMode} />
            </div>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-col activity-col full-width">
            <div className={`dashboard-card ${darkMode ? 'dark-card' : ''}`}>
              <h2 className="card-title">Recent Activity</h2>
              <RecentActivity activities={recentActivity} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

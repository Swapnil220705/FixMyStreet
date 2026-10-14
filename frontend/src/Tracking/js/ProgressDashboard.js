import React, { useState, useEffect } from 'react';
import '../css/ProgressDashboard.css';

/**
 * ProgressDashboard Component
 * ---------------------------------------------------------------------
 * This component provides a summary view of all complaints and their
 * statuses. It includes statistics, filtering options, and a visual
 * representation of complaint progress.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.complaints - Array of complaint objects
 * @param {boolean} props.showDemo - Whether to show demo data
 * @returns {JSX.Element} - Rendered component
 */
const ProgressDashboard = ({ complaints = [], showDemo = false }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [displayComplaints, setDisplayComplaints] = useState([]);
  
  // Mock data for demonstration
  const mockComplaints = [
    {
      id: 'REP-2025-1089',
      type: 'Pothole',
      location: 'Main Street',
      severity: 'High',
      status: 'Pending',
      reportedAt: '2025-04-13T09:45:00',
      updatedAt: '2025-04-13T10:30:00',
      progress: 20
    },
    {
      id: 'REP-2025-1088',
      type: 'Broken Pavement',
      location: 'Gandhi Road',
      severity: 'Medium',
      status: 'In Progress',
      reportedAt: '2025-04-12T14:30:00',
      updatedAt: '2025-04-14T11:15:00',
      progress: 60
    },
    {
      id: 'REP-2025-1087',
      type: 'Road Damage',
      location: 'Nehru Street',
      severity: 'Low',
      status: 'Resolved',
      reportedAt: '2025-04-11T11:15:00',
      updatedAt: '2025-04-13T16:45:00',
      progress: 100
    },
    {
      id: 'REP-2025-1086',
      type: 'Street Light',
      location: 'Park Avenue',
      severity: 'Medium',
      status: 'Assigned',
      reportedAt: '2025-04-10T16:20:00',
      updatedAt: '2025-04-12T09:30:00',
      progress: 40
    },
    {
      id: 'REP-2025-1085',
      type: 'Traffic Signal',
      location: 'MG Road',
      severity: 'High',
      status: 'In Progress',
      reportedAt: '2025-04-09T10:45:00',
      updatedAt: '2025-04-14T08:15:00',
      progress: 70
    }
  ];

  // Use mock data if showDemo is true or if no complaints are provided
  useEffect(() => {
    const data = showDemo || complaints.length === 0 ? mockComplaints : complaints;
    
    // Apply filters
    let filtered = [...data];
    if (filter !== 'all') {
      filtered = data.filter(complaint => complaint.status.toLowerCase() === filter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
        break;
      case 'severity':
        const severityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        filtered.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
        break;
      case 'progress':
        filtered.sort((a, b) => b.progress - a.progress);
        break;
      default:
        filtered.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
    }
    
    setDisplayComplaints(filtered);
  }, [complaints, filter, sortBy, showDemo]);

  // Calculate statistics
  const getStatistics = (data) => {
    const total = data.length;
    const pending = data.filter(c => c.status === 'Pending').length;
    const inProgress = data.filter(c => c.status === 'In Progress' || c.status === 'Assigned').length;
    const resolved = data.filter(c => c.status === 'Resolved').length;
    
    const avgResolutionTime = resolved > 0 
      ? data
          .filter(c => c.status === 'Resolved')
          .reduce((sum, c) => {
            const reportDate = new Date(c.reportedAt);
            const resolveDate = new Date(c.updatedAt);
            return sum + (resolveDate - reportDate) / (1000 * 60 * 60 * 24); // days
          }, 0) / resolved
      : 0;
    
    return { total, pending, inProgress, resolved, avgResolutionTime };
  };

  const stats = getStatistics(showDemo ? mockComplaints : complaints);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'resolved': return 'status-resolved';
      case 'in progress': return 'status-in-progress';
      case 'assigned': return 'status-assigned';
      case 'pending': default: return 'status-pending';
    }
  };

  // Get severity class for styling
  const getSeverityClass = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return '';
    }
  };

  return (
    <div className="progress-dashboard">
      <h3 className="dashboard-title">Complaint Progress Dashboard</h3>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>{stats.total}</h4>
          <p>Total Complaints</p>
        </div>
        <div className="stat-card pending">
          <h4>{stats.pending}</h4>
          <p>Pending</p>
        </div>
        <div className="stat-card in-progress">
          <h4>{stats.inProgress}</h4>
          <p>In Progress</p>
        </div>
        <div className="stat-card resolved">
          <h4>{stats.resolved}</h4>
          <p>Resolved</p>
        </div>
        <div className="stat-card">
          <h4>{stats.avgResolutionTime.toFixed(1)} days</h4>
          <p>Avg. Resolution Time</p>
        </div>
      </div>
      
      <div className="dashboard-controls">
        <div className="filter-group">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select 
            id="status-filter" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="assigned">Assigned</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-by">Sort by:</label>
          <select 
            id="sort-by" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date (Newest First)</option>
            <option value="severity">Severity (Highest First)</option>
            <option value="progress">Progress (Most Complete)</option>
          </select>
        </div>
      </div>
      
      {displayComplaints.length > 0 ? (
        <div className="complaints-table-container">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {displayComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.id}</td>
                  <td>{complaint.type}</td>
                  <td>{complaint.location}</td>
                  <td>
                    <span className={`severity-badge ${getSeverityClass(complaint.severity)}`}>
                      {complaint.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>{formatDate(complaint.reportedAt)}</td>
                  <td>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${complaint.progress}%` }}
                      ></div>
                      <span className="progress-text">{complaint.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-complaints">
          <p>No complaints match your current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProgressDashboard;

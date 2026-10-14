import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    // Check if the date is today
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if the date is yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise, return the full date
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'resolved':
        return 'status-resolved';
      case 'in progress':
        return 'status-in-progress';
      case 'assigned':
        return 'status-assigned';
      case 'pending':
      default:
        return 'status-pending';
    }
  };
  
  const getSeverityClass = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high':
        return 'severity-high';
      case 'medium':
        return 'severity-medium';
      case 'low':
        return 'severity-low';
      default:
        return '';
    }
  };

  return (
    <div className="recent-activity">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className="activity-header">
            <span className="activity-id">{activity.id}</span>
            <span className={`activity-status ${getStatusClass(activity.status)}`}>
              {activity.status}
            </span>
          </div>
          
          <div className="activity-content">
            <h4 className="activity-type">{activity.type}</h4>
            <p className="activity-location">{activity.location}</p>
            <div className="activity-meta">
              <span className={`activity-severity ${getSeverityClass(activity.severity)}`}>
                {activity.severity} Severity
              </span>
              <span className="activity-time">{formatDate(activity.reportedAt)}</span>
            </div>
          </div>
          
          <div className="activity-footer">
            <span className="activity-reporter">Reported by: {activity.reportedBy}</span>
            <button className="btn-view-details">View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;

import React from 'react';
import '../css/StatusBadge.css';

/**
 * StatusBadge Component
 * ---------------------------------------------------------------------
 * This component displays the current status of a complaint with 
 * appropriate color coding. It supports various statuses like "Pending",
 * "In Progress", "Resolved", etc.
 * 
 * @param {Object} props - Component props
 * @param {string} props.status - The current status of the complaint
 * @param {boolean} props.large - Whether to display a larger version of the badge
 * @param {boolean} props.withIcon - Whether to display an icon with the status
 * @param {boolean} props.showDemo - Whether to show all statuses for demo purposes
 * @returns {JSX.Element} - Rendered component
 */
const StatusBadge = ({ status, large = false, withIcon = false, showDemo = false }) => {
  // Normalize status to lowercase and remove spaces for consistent handling
  const normalizedStatus = status?.toLowerCase().replace(/\s+/g, '-') || 'pending';
  
  // Status configuration with display text, icons, and descriptions
  const statusConfig = {
    'pending': { 
      text: 'Pending', 
      icon: '⏳', 
      description: 'Your report has been received and is awaiting verification'
    },
    'verified': { 
      text: 'Verified', 
      icon: '✓', 
      description: 'Your report has been verified by our AI system'
    },
    'in-progress': { 
      text: 'In Progress', 
      icon: '🔧', 
      description: 'Maintenance crew is working on the issue'
    },
    'assigned': { 
      text: 'Assigned', 
      icon: '👷', 
      description: 'Your report has been assigned to a department'
    },
    'resolved': { 
      text: 'Resolved', 
      icon: '✅', 
      description: 'The issue has been fixed'
    },
    'rejected': { 
      text: 'Rejected', 
      icon: '❌', 
      description: 'Your report could not be verified or addressed'
    }
  };
  
  // Mock data for demonstration
  const mockStatuses = [
    'pending',
    'verified',
    'in-progress',
    'assigned',
    'resolved',
    'rejected'
  ];
  
  // Use the configuration for the current status, or default if not found
  const currentStatus = statusConfig[normalizedStatus] || {
    text: status || 'Unknown',
    icon: '❓',
    description: 'Status information unavailable'
  };
  
  // If showDemo is true, render all status badges
  if (showDemo) {
    return (
      <div className="status-badge-demo">
        <h3>Status Badge Examples</h3>
        
        <div className="status-badge-section">
          <h4>Regular Size</h4>
          <div className="status-badge-row">
            {mockStatuses.map(statusKey => (
              <div 
                key={statusKey}
                className={`status-badge status-${statusKey}`}
                title={statusConfig[statusKey].description}
              >
                <span className="status-text">{statusConfig[statusKey].text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="status-badge-section">
          <h4>Large Size</h4>
          <div className="status-badge-row">
            {mockStatuses.map(statusKey => (
              <div 
                key={statusKey}
                className={`status-badge status-${statusKey} status-badge-large`}
                title={statusConfig[statusKey].description}
              >
                <span className="status-text">{statusConfig[statusKey].text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="status-badge-section">
          <h4>With Icons</h4>
          <div className="status-badge-row">
            {mockStatuses.map(statusKey => (
              <div 
                key={statusKey}
                className={`status-badge status-${statusKey}`}
                title={statusConfig[statusKey].description}
              >
                <span className="status-icon">{statusConfig[statusKey].icon}</span>
                <span className="status-text">{statusConfig[statusKey].text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Regular single badge rendering
  return (
    <div 
      className={`status-badge status-${normalizedStatus} ${large ? 'status-badge-large' : ''}`}
      title={currentStatus.description}
    >
      {withIcon && <span className="status-icon">{currentStatus.icon}</span>}
      <span className="status-text">{currentStatus.text}</span>
    </div>
  );
};

export default StatusBadge;

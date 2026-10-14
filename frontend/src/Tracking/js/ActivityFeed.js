import React from 'react';
import '../css/ActivityFeed.css';

/**
 * ActivityFeed Component
 * ---------------------------------------------------------------------
 * This component displays a chronological feed of activities related to
 * a complaint, such as status changes, department assignments, and
 * comments from both citizens and authorities.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.activities - Array of activity objects
 * @param {boolean} props.showDemo - Whether to show demo data
 * @returns {JSX.Element} - Rendered component
 */
const ActivityFeed = ({ activities = [], showDemo = false }) => {
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

  // Get icon based on activity type
  const getActivityIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'status_change':
        return '🔄';
      case 'comment':
        return '💬';
      case 'assignment':
        return '👷';
      case 'verification':
        return '✅';
      case 'escalation':
        return '⚠️';
      case 'resolution':
        return '🎉';
      default:
        return '📝';
    }
  };

  // Mock data for demonstration
  const mockActivities = [
    {
      id: 'act1',
      type: 'status_change',
      message: 'Status changed from "Pending" to "Verified"',
      timestamp: '2025-04-14T10:30:00',
      user: {
        name: 'System',
        role: 'automated'
      }
    },
    {
      id: 'act2',
      type: 'verification',
      message: 'Issue verified by AI system. Severity classified as "High"',
      timestamp: '2025-04-14T10:32:00',
      user: {
        name: 'AI Verification System',
        role: 'system'
      }
    },
    {
      id: 'act3',
      type: 'assignment',
      message: 'Assigned to Roads & Infrastructure Department',
      timestamp: '2025-04-14T11:45:00',
      user: {
        name: 'Dispatch Manager',
        role: 'staff'
      }
    },
    {
      id: 'act4',
      type: 'comment',
      message: 'We have scheduled an inspection team to visit the site tomorrow morning.',
      timestamp: '2025-04-14T13:20:00',
      user: {
        name: 'Rajesh Kumar',
        role: 'staff',
        department: 'Roads & Infrastructure'
      }
    },
    {
      id: 'act5',
      type: 'comment',
      message: 'Thank you for the quick response. This pothole is causing traffic problems during rush hour.',
      timestamp: '2025-04-14T14:05:00',
      user: {
        name: 'Citizen',
        role: 'reporter'
      }
    },
    {
      id: 'act6',
      type: 'status_change',
      message: 'Status changed from "Verified" to "In Progress"',
      timestamp: '2025-04-15T09:15:00',
      user: {
        name: 'System',
        role: 'automated'
      }
    }
  ];

  // Use mock data if showDemo is true or if no activities are provided
  const displayActivities = showDemo || activities.length === 0 ? mockActivities : activities;

  return (
    <div className="activity-feed">
      <h3 className="activity-feed-title">Activity Timeline</h3>
      
      {displayActivities.length > 0 ? (
        <div className="activity-timeline">
          {displayActivities.map((activity) => (
            <div key={activity.id} className={`activity-item activity-${activity.type.toLowerCase()}`}>
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <div className="activity-header">
                  <span className={`activity-user ${activity.user.role}`}>
                    {activity.user.name}
                    {activity.user.department && (
                      <span className="activity-department">
                        {activity.user.department}
                      </span>
                    )}
                  </span>
                  <span className="activity-time">{formatDate(activity.timestamp)}</span>
                </div>
                <div className="activity-message">{activity.message}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="activity-empty">
          <p>No activity recorded yet for this complaint.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;

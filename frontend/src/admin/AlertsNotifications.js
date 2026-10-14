import React, { useState, useEffect } from 'react';
import '../styles/Adminglobal.css';

const AlertsNotifications = () => {
  // Mock data for alerts and notifications
  const [alerts, setAlerts] = useState([
    { 
      id: 'ALT-2025-0042', 
      type: 'high_severity', 
      title: 'High Severity Pothole Reported',
      description: 'A new high severity pothole has been reported on MG Road requiring immediate attention',
      reportId: 'REP-2025-1092',
      location: 'MG Road near Central Mall',
      createdAt: '2025-04-13T15:10:00',
      read: false
    },
    { 
      id: 'ALT-2025-0041', 
      type: 'overdue', 
      title: 'Overdue Resolution',
      description: 'Report REP-2025-1080 has exceeded the SLA resolution time of 48 hours',
      reportId: 'REP-2025-1080',
      location: 'Gandhi Road',
      createdAt: '2025-04-13T14:30:00',
      read: false
    },
    { 
      id: 'ALT-2025-0040', 
      type: 'assignment', 
      title: 'New Assignment',
      description: 'Report REP-2025-1088 has been assigned to Roads & Infrastructure department',
      reportId: 'REP-2025-1088',
      location: 'Gandhi Road',
      createdAt: '2025-04-13T12:45:00',
      read: true
    },
    { 
      id: 'ALT-2025-0039', 
      type: 'status_update', 
      title: 'Status Update',
      description: 'Report REP-2025-1075 status changed from "In Progress" to "Resolved"',
      reportId: 'REP-2025-1075',
      location: 'Nehru Street',
      createdAt: '2025-04-13T11:20:00',
      read: true
    },
    { 
      id: 'ALT-2025-0038', 
      type: 'citizen_feedback', 
      title: 'Citizen Feedback Received',
      description: 'New feedback submitted for resolved report REP-2025-1065',
      reportId: 'REP-2025-1065',
      location: 'Park Avenue',
      createdAt: '2025-04-13T10:05:00',
      read: true
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    notifyHighSeverity: true,
    notifyOverdue: true,
    notifyAssignments: true,
    notifyStatusUpdates: false,
    notifyCitizenFeedback: false,
    emailDigestFrequency: 'daily'
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If today, show time only
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show full date
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter alerts based on selected filter
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.read;
    return alert.type === filter;
  });

  // Mark alert as read
  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  // Mark all alerts as read
  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  // Get alert type icon and class
  const getAlertTypeInfo = (type) => {
    switch(type) {
      case 'high_severity':
        return { icon: '🔴', class: 'alert-high-severity', label: 'High Severity' };
      case 'overdue':
        return { icon: '⏰', class: 'alert-overdue', label: 'Overdue' };
      case 'assignment':
        return { icon: '📋', class: 'alert-assignment', label: 'Assignment' };
      case 'status_update':
        return { icon: '🔄', class: 'alert-status-update', label: 'Status Update' };
      case 'citizen_feedback':
        return { icon: '💬', class: 'alert-citizen-feedback', label: 'Citizen Feedback' };
      default:
        return { icon: '📢', class: 'alert-default', label: 'Notification' };
    }
  };

  // Count unread notifications
  const unreadCount = alerts.filter(alert => !alert.read).length;

  // Handle view alert details
  const viewAlertDetails = (alert) => {
    setSelectedAlert(alert);
    markAsRead(alert.id);
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    // In a real app, this would send settings to an API
    alert('Notification settings saved successfully!');
  };

  return (
    <div className="alerts-notifications-container">
      <h1 className="alerts-notifications-title">Alerts & Notifications</h1>
      
      <div className="alerts-notifications-header">
        <div className="alerts-count">
          <span className="total-count">{alerts.length} Total</span>
          {unreadCount > 0 && (
            <span className="unread-count">{unreadCount} Unread</span>
          )}
        </div>
        
        <div className="alerts-actions">
          <button 
            className="btn-mark-read" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </button>
          <button 
            className="btn-settings"
            onClick={() => setSelectedAlert('settings')}
          >
            Notification Settings
          </button>
        </div>
      </div>
      
      <div className="alerts-filter">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'unread' ? 'active' : ''}`} 
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        <button 
          className={`filter-btn ${filter === 'high_severity' ? 'active' : ''}`} 
          onClick={() => setFilter('high_severity')}
        >
          High Severity
        </button>
        <button 
          className={`filter-btn ${filter === 'overdue' ? 'active' : ''}`} 
          onClick={() => setFilter('overdue')}
        >
          Overdue
        </button>
        <button 
          className={`filter-btn ${filter === 'assignment' ? 'active' : ''}`} 
          onClick={() => setFilter('assignment')}
        >
          Assignments
        </button>
      </div>
      
      <div className="alerts-list">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              className={`alert-item ${!alert.read ? 'unread' : ''}`}
              onClick={() => viewAlertDetails(alert)}
            >
              <div className={`alert-icon ${getAlertTypeInfo(alert.type).class}`}>
                {getAlertTypeInfo(alert.type).icon}
              </div>
              <div className="alert-content">
                <div className="alert-header">
                  <h3 className="alert-title">{alert.title}</h3>
                  <span className="alert-time">{formatDate(alert.createdAt)}</span>
                </div>
                <p className="alert-description">{alert.description}</p>
                <div className="alert-meta">
                  <span className="alert-location">📍 {alert.location}</span>
                  <span className="alert-report-id">🆔 {alert.reportId}</span>
                </div>
              </div>
              {!alert.read && <div className="unread-indicator"></div>}
            </div>
          ))
        ) : (
          <div className="no-alerts">
            <p>No notifications match your current filter.</p>
          </div>
        )}
      </div>
      
      {selectedAlert && selectedAlert !== 'settings' && (
        <div className="alert-modal-overlay">
          <div className="alert-modal">
            <div className="alert-modal-header">
              <div className="modal-title-container">
                <span className={`modal-alert-icon ${getAlertTypeInfo(selectedAlert.type).class}`}>
                  {getAlertTypeInfo(selectedAlert.type).icon}
                </span>
                <h2>{selectedAlert.title}</h2>
              </div>
              <button 
                className="btn-close" 
                onClick={() => setSelectedAlert(null)}
              >
                ✕
              </button>
            </div>
            <div className="alert-modal-body">
              <div className="alert-details">
                <div className="alert-detail-row">
                  <span className="detail-label">Alert Type:</span>
                  <span className="detail-value">{getAlertTypeInfo(selectedAlert.type).label}</span>
                </div>
                <div className="alert-detail-row">
                  <span className="detail-label">Report ID:</span>
                  <span className="detail-value">
                    <a href={`/reports/${selectedAlert.reportId}`} className="report-link">
                      {selectedAlert.reportId}
                    </a>
                  </span>
                </div>
                <div className="alert-detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{selectedAlert.location}</span>
                </div>
                <div className="alert-detail-row">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{formatDate(selectedAlert.createdAt)}</span>
                </div>
                <div className="alert-detail-row">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value description">{selectedAlert.description}</span>
                </div>
              </div>
              
              <div className="alert-actions">
                <button className="btn-view-report">
                  View Full Report
                </button>
                {selectedAlert.type === 'high_severity' && (
                  <button className="btn-escalate">
                    Escalate to Emergency
                  </button>
                )}
                {selectedAlert.type === 'overdue' && (
                  <button className="btn-reassign">
                    Reassign Task
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedAlert === 'settings' && (
        <div className="alert-modal-overlay">
          <div className="alert-modal settings-modal">
            <div className="alert-modal-header">
              <h2>Notification Settings</h2>
              <button 
                className="btn-close" 
                onClick={() => setSelectedAlert(null)}
              >
                ✕
              </button>
            </div>
            <div className="alert-modal-body">
              <div className="settings-section">
                <h3>Notification Channels</h3>
                <div className="setting-row">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.emailNotifications}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: !notificationSettings.emailNotifications
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Email Notifications</span>
                    <span className="setting-description">Receive notifications via email</span>
                  </div>
                </div>
                <div className="setting-row">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.pushNotifications}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: !notificationSettings.pushNotifications
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Push Notifications</span>
                    <span className="setting-description">Receive notifications in browser</span>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Notification Types</h3>
                <div className="setting-row">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.notifyHighSeverity}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyHighSeverity: !notificationSettings.notifyHighSeverity
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">High Severity Issues</span>
                    <span className="setting-description">Notify when high severity issues are reported</span>
                  </div>
                </div>
                <div className="setting-row">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.notifyOverdue}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyOverdue: !notificationSettings.notifyOverdue
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Overdue Tasks</span>
                    <span className="setting-description">Notify when tasks exceed SLA resolution time</span>
                  </div>
                </div>
                <div className="setting-row">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.notifyAssignments}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyAssignments: !notificationSettings.notifyAssignments
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Task Assignments</span>
                    <span className="setting-description">Notify when tasks are assigned to departments</span>
                  </div>
                </div>
                <div className="setting-row">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.notifyStatusUpdates}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyStatusUpdates: !notificationSettings.notifyStatusUpdates
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Status Updates</span>
                    <span className="setting-description">Notify when report statuses change</span>
                  </div>
                </div>
                <div className="setting-row">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.notifyCitizenFeedback}
                      onChange={() => setNotificationSettings({
                        ...notificationSettings,
                        notifyCitizenFeedback: !notificationSettings.notifyCitizenFeedback
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <div className="setting-info">
                    <span className="setting-label">Citizen Feedback</span>
                    <span className="setting-description">Notify when citizens provide feedback</span>
                  </div>
                </div>
              </div>
              
              <div className="settings-section">
                <h3>Email Digest Frequency</h3>
                <div className="setting-row">
                  <select 
                    value={notificationSettings.emailDigestFrequency}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailDigestFrequency: e.target.value
                    })}
                    className="frequency-select"
                  >
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="alert-modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => setSelectedAlert(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={saveNotificationSettings}
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsNotifications;

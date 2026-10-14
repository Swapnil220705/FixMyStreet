import React, { useState, useEffect } from 'react';
import ProgressTimeline from './js/ProgressTimeline';
import StatusBadge from './js/StatusBadge';
import ActivityFeed from './js/ActivityFeed';
import CitizenFeedback from './js/CitizenFeedback';
import DocumentViewer from './js/DocumentViewer';
import ProgressDashboard from './js/ProgressDashboard';
import './css/ComplaintTrackingPage.css';

const ComplaintTrackingPage = ({ complaintId }) => {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock data for demonstration
  const mockComplaint = {
    id: 'REP-2025-1089',
    type: 'Pothole',
    location: 'Main Street',
    description: 'Large pothole approximately 30cm wide and 10cm deep. Causing traffic to swerve dangerously.',
    severity: 'High',
    status: 'In Progress',
    reportedAt: '2025-04-13T09:45:00',
    updatedAt: '2025-04-14T11:15:00',
    progress: 60,
    stages: [
      { id: 'stage1', title: 'Submitted', description: 'Complaint submitted by citizen', date: '2025-04-13T09:45:00', completed: true },
      { id: 'stage2', title: 'Verified', description: 'Complaint verified by AI system', date: '2025-04-13T10:30:00', completed: true },
      { id: 'stage3', title: 'Assigned', description: 'Assigned to Roads & Infrastructure department', date: '2025-04-14T11:15:00', completed: true },
      { id: 'stage4', title: 'In Progress', description: 'Repair crew working on the issue', date: '2025-04-14T14:30:00', completed: true },
      { id: 'stage5', title: 'Quality Check', description: 'Inspection of completed work', date: '2025-04-15T09:00:00', completed: false },
      { id: 'stage6', title: 'Resolved', description: 'Issue fixed and closed', date: '', completed: false }
    ]
  };
  
  // Fetch complaint data (simulated with useEffect)
  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await fetch(`/api/complaints/${complaintId}`);
        // const data = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for now
        setComplaint(mockComplaint);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch complaint data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchComplaintData();
  }, [complaintId]);
  
  // Handle feedback submission
  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    // In a real app, you would send this to your API
    alert(`Thank you for your feedback! Your rating: ${feedback.rating}/5`);
  };
  
  if (loading) {
    return <div className="loading-spinner">Loading complaint data...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (!complaint) {
    return <div className="not-found">Complaint not found.</div>;
  }
  
  return (
    <div className="complaint-tracking-page">
      <div className="complaint-header">
        <h1>Complaint #{complaint.id}</h1>
        <div className="complaint-meta">
          <div className="meta-item">
            <span className="meta-label">Type:</span>
            <span className="meta-value">{complaint.type}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Location:</span>
            <span className="meta-value">{complaint.location}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Status:</span>
            <StatusBadge status={complaint.status} large withIcon />
          </div>
        </div>
      </div>
      
      <div className="complaint-description">
        <h2>Description</h2>
        <p>{complaint.description}</p>
      </div>
      
      <div className="tracking-section">
        <h2>Progress Tracking</h2>
        <ProgressTimeline stages={complaint.stages} />
      </div>
      
      <div className="tracking-grid">
        <div className="activity-section">
          <ActivityFeed showDemo={true} />
        </div>
        
        <div className="documents-section">
          <DocumentViewer showDemo={true} />
        </div>
      </div>
      
      <div className="feedback-section">
        <CitizenFeedback onSubmit={handleFeedbackSubmit} />
      </div>
      
      <div className="dashboard-section">
        <h2>All Complaints</h2>
        <ProgressDashboard showDemo={true} />
      </div>
    </div>
  );
};

export default ComplaintTrackingPage;

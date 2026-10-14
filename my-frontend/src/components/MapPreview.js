import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

/**
 * MapPreview Component
 * ---------------------------------------------------------------------
 * This component represents an interactive map preview with a dual-view
 * system: one for citizens and another for municipal authorities. It 
 * utilizes a tab interface to switch between views and displays issue 
 * markers on a Google Map.
 **/
const MapPreview = () => {
  /**
   * State: activeTab
   * ---------------------------------------------------------------------
   * Manages the current active tab ('citizen' or 'authority').
   **/
  const [activeTab, setActiveTab] = useState('citizen');
  
  /**
   * State: selectedIssue
   * ---------------------------------------------------------------------
   * Tracks the currently selected issue (if any).
   **/
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  /**
   * State: imageFiles
   * ---------------------------------------------------------------------
   * Tracks uploaded image files.
   **/
  const [imageFiles, setImageFiles] = useState([]);
  
  /**
   * Google Maps API Integration
   * ---------------------------------------------------------------------
   * Loads the Google Maps script with the API key.
   **/
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });
  
  /**
   * Mock Data: mockIssues
   * ---------------------------------------------------------------------
   * This array holds sample data representing road issues with properties 
   * such as id, type, severity, status, and coordinates (lat, lng).
   **/
  const mockIssues = [
    { id: 1, type: "Pothole", severity: "High", status: "In Progress", lat: 40.7128, lng: -74.0060 },
    { id: 2, type: "Broken Pavement", severity: "Medium", status: "Reported", lat: 40.7328, lng: -73.9860 },
    { id: 3, type: "Road Damage", severity: "Low", status: "Resolved", lat: 40.7028, lng: -74.0160 }
  ];

  /**
   * Map Configuration
   * ---------------------------------------------------------------------
   * Settings for the Google Map component.
   **/
  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };
  
  const center = {
    lat: 40.7128,
    lng: -74.0060, // NYC coordinates as example
  };
  
  const options = {
    disableDefaultUI: false,
    zoomControl: true,
  };

  /**
   * Handler: handleImageChange
   * ---------------------------------------------------------------------
   * Handles image file uploads.
   **/
  const handleImageChange = (e) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  /**
   * Helper Functions
   * ---------------------------------------------------------------------
   * Functions to determine marker styling based on issue properties.
   **/
  const getMarkerIcon = (severity, status) => {
    if (!isLoaded || !window.google) return null;
    
    let color = '#FF0000'; // Default red for high severity
    
    if (severity === 'Medium') color = '#FFA500'; // Orange
    if (severity === 'Low') color = '#FFFF00'; // Yellow
    if (status === 'Resolved') color = '#00FF00'; // Green for resolved
    
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.8,
      strokeWeight: 2,
      strokeColor: '#FFFFFF',
      scale: 10
    };
  };

  /**
   * Render conditionally based on map loading status
   */
  if (loadError) {
    return <div className="map-error">Error loading maps: {loadError.message}</div>;
  }

  /**
   * Component Rendering
   * ---------------------------------------------------------------------
   * Returns the main JSX structure for the map preview section.
   **/
  return (
    <section className="map-preview-section">
      <div className="container">
        <div className="section-header">
          <h2>Interactive Maps for Everyone</h2>
          <p>Seamless experience for both citizens and municipal authorities</p>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'citizen' ? 'active' : ''}`}
              onClick={() => setActiveTab('citizen')}
            >
              Citizen View
            </button>
            <button 
              className={`tab ${activeTab === 'authority' ? 'active' : ''}`}
              onClick={() => setActiveTab('authority')}
            >
              Authority Dashboard
            </button>
          </div>
        </div>
        
        <div className="map-container">
          <div className="map-interface">
            <div className="map-area">
              {!isLoaded ? (
                <div className="loading-map">Loading Map...</div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  zoom={13}
                  center={center}
                  options={options}
                  onClick={() => setSelectedIssue(null)}
                >
                  {/* Render map markers from mock data */}
                  {mockIssues.map(issue => (
                    <Marker
                      key={issue.id}
                      position={{ lat: issue.lat, lng: issue.lng }}
                      onClick={() => setSelectedIssue(issue)}
                      icon={getMarkerIcon(issue.severity, issue.status)}
                      title={`${issue.type} - ${issue.severity} - ${issue.status}`}
                    />
                  ))}
                </GoogleMap>
              )}
            </div>
            
            <div className="map-sidebar">
              <h3>{activeTab === 'citizen' ? 'Report an Issue' : 'Issue Analytics'}</h3>
              
              {activeTab === 'citizen' ? (
                /**
                 * Citizen Controls Section
                 * -----------------------------------------------------------------
                 * Provides a form for citizens to report an issue.
                 **/
                <div className="citizen-controls">
                  <div className="form-group">
                    <label>Issue Type</label>
                    <select>
                      <option>Pothole</option>
                      <option>Broken Pavement</option>
                      <option>Road Damage</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Upload Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      required
                      className="btn-outline"
                      onChange={handleImageChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe the issue..."></textarea>
                  </div>
                  
                  <button className="btn-primary">Submit Report</button>
                </div>
              ) : (
                /**
                 * Authority Controls Section
                 * -----------------------------------------------------------------
                 * This section is designed for municipal authorities.
                 **/
                <div className="authority-controls">
                  <div className="stats-summary">
                    <div className="stat">
                      <h4>24</h4>
                      <p>Open Issues</p>
                    </div>
                    <div className="stat">
                      <h4>12</h4>
                      <p>In Progress</p>
                    </div>
                    <div className="stat">
                      <h4>156</h4>
                      <p>Resolved</p>
                    </div>
                  </div>
                  
                  <div className="issue-filter">
                    <label>Filter by:</label>
                    <select>
                      <option>All Issues</option>
                      <option>High Severity</option>
                      <option>Recent Reports</option>
                      <option>Most Voted</option>
                    </select>
                  </div>
                  
                  <div className="issue-list">
                    {mockIssues.map(issue => (
                      <div 
                        key={issue.id} 
                        className={`issue-item ${issue.severity.toLowerCase()}`}
                        onClick={() => setSelectedIssue(issue)}
                      >
                        <span className="issue-type">{issue.type}</span>
                        <span className={`issue-status ${issue.status.toLowerCase().replace(' ', '-')}`}>
                          {issue.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Show selected issue details if any */}
              {selectedIssue && (
                <div className="selected-issue-details">
                  <h4>Selected Issue</h4>
                  <p><strong>Type:</strong> {selectedIssue.type}</p>
                  <p><strong>Severity:</strong> {selectedIssue.severity}</p>
                  <p><strong>Status:</strong> {selectedIssue.status}</p>
                  <p><strong>Location:</strong> {selectedIssue.lat.toFixed(4)}, {selectedIssue.lng.toFixed(4)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
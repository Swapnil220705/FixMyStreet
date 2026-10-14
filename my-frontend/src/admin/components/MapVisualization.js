import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapVisualization = ({ issues }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_ADMIN_GOOGLE_MAPS_API_KEY || process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
  });
  
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px'
  };
  
  // Center the map based on average location of issues
  const center = issues.length > 0 
    ? {
        lat: issues.reduce((sum, issue) => sum + issue.lat, 0) / issues.length,
        lng: issues.reduce((sum, issue) => sum + issue.lng, 0) / issues.length,
      }
    : { lat: 28.6139, lng: 77.2090 }; // Default to New Delhi if no issues
  
  const options = {
    disableDefaultUI: false,
    zoomControl: true,
  };
  
  const getMarkerIcon = (severity, status) => {
    if (!window.google || !window.google.maps) return null;
    
    let color;
    
    // Set color based on severity
    if (severity === 'High') color = '#FF0000'; // Red
    else if (severity === 'Medium') color = '#FFA500'; // Orange
    else color = '#00CC00'; // Green for Low
    
    // If resolved, change color to blue
    if (status === 'Resolved') color = '#2980b9';
    
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.8,
      strokeWeight: 2,
      strokeColor: '#FFFFFF',
      scale: 10
    };
  };
  
  if (!isLoaded) {
    return <div className="map-loading">Loading map...</div>;
  }
  
  return (
    <div className="map-visualization">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={() => setSelectedIssue(null)}
      >
        {issues.map(issue => (
          <Marker
            key={issue.id}
            position={{ lat: issue.lat, lng: issue.lng }}
            onClick={() => setSelectedIssue(issue)}
            icon={getMarkerIcon(issue.severity, issue.status)}
            title={`${issue.type} - ${issue.severity}`}
          />
        ))}
        
        {selectedIssue && (
          <InfoWindow
            position={{ lat: selectedIssue.lat, lng: selectedIssue.lng }}
            onCloseClick={() => setSelectedIssue(null)}
          >
            <div className="info-window">
              <h3>{selectedIssue.type}</h3>
              <p><strong>Status:</strong> {selectedIssue.status}</p>
              <p><strong>Severity:</strong> {selectedIssue.severity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapVisualization;
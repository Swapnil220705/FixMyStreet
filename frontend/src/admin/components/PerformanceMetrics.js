import React from 'react';
import './PerformanceMetrics.css';

const PerformanceMetrics = ({ metrics }) => {
  if (!metrics || !metrics.issuesResolvedByDepartment) {
    return <div>No performance metrics available.</div>;
  }

  const { averageResolutionTime, issuesResolvedByDepartment } = metrics;
  const maxResolved = Math.max(...issuesResolvedByDepartment.map(d => d.resolved), 1); // Avoid divide-by-zero

  return (
    <div className="performance-metrics">
      <div className="resolution-time">
        <h3>Average Resolution Time</h3>
        <div className="time-display">
          <span className="time-value">{averageResolutionTime}</span>
          <span className="time-unit">hours</span>
        </div>
      </div>
      
      <div className="department-performance">
        <h3>Issues Resolved by Department</h3>
        <div className="department-list">
          {issuesResolvedByDepartment.map((dept, index) => (
            <div key={index} className="department-item">
              <div className="department-info">
                <span className="department-name">{dept.department}</span>
                <span className="department-count">{dept.resolved}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${(dept.resolved / maxResolved) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;

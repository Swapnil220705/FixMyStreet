import React from 'react';
import '../css/ProgressTimeline.css'; // Importing the CSS file

const ProgressTimeline = ({ stages = [] }) => {
  return (
    <div className="progress-timeline">
      {stages.length === 0 ? (
        <p>No stages available.</p>
      ) : (
        stages.map((stage, index) => (
          <div key={stage.id} className={`timeline-item ${stage.completed ? 'completed' : ''}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>{stage.title}</h4>
              <p>{stage.description}</p>
              <span className="timeline-date">{new Date(stage.date).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            {index < stages.length - 1 && <div className="timeline-connector"></div>}
          </div>
        ))
      )}
    </div>
  );
};

export default ProgressTimeline;

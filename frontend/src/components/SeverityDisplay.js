import React from 'react';

const SeverityDisplay = ({ severity, damageScore }) => {
  return (
    <div className="severity-display">
      <h3>AI Assessment Results</h3>
      <p>Severity: <strong>{severity}</strong></p>
      <p>Damage Score: <strong>{damageScore}</strong></p>
    </div>
  );
};

export default SeverityDisplay;

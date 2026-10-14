import React from 'react';
import './StatisticsCard.css';

const StatisticsCard = ({ title, value, icon, color }) => {
  return (
    <div className="statistics-card">
      <div className="statistics-icon" style={{ color: color || 'var(--primary)' }}>
        {icon}
      </div>
      <div className="statistics-content">
        <h3 className="statistics-value">{value}</h3>
        <p className="statistics-title">{title}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;

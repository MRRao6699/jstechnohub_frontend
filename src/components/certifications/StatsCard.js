import React from 'react';
import './StatsCard.css';

function StatsCard({ icon, percentage, description }) {
  return (
    <div className="stats-card">
      <div className="icon">{icon}</div>
      <div className="percent">{percentage}</div>
      <div className="desc">{description}</div>
    </div>
  );
}

export default StatsCard;

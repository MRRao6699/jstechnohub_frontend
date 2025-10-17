import React from 'react';
import './FeatureBox.css';

function FeatureBox({ icon, title, description }) {
  return (
    <div className="feature-box">
      <div className="icon">{icon}</div>
      <div className="text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default FeatureBox;

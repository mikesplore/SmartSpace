import React from 'react';
import './LoadingSpinner.css'; // make sure to create this file or use styled-components

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );
};

export default LoadingSpinner;

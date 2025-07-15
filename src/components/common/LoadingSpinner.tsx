import React from 'react';
import './LoadingSpinner.css'; // make sure to create this file or use styled-components

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-overlay"> 
    ##!-- Fullscreen overlay for the spinner --
      <div className="spinner-container">
        <div className="spinner" />
      </div>    
    </div>
  );
};

export default LoadingSpinner;

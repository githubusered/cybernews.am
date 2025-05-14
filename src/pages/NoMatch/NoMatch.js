import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoMatch.css';

const NoMatch = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate('/')
  }
  return (
    <div className="no-match-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for does not exist.</p>
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default NoMatch;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>
        The page you are looking for does not exist. Go back to{' '}
        <Link to="/">Home</Link>.
      </p>
    </div>
  );
};

export default NotFound;
